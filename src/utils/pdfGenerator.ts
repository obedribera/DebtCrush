import jsPDF from 'jspdf';
import { Debt, MonthlySnapshot } from '../types/debt';
import { formatDate } from './dateUtils';
import { Language } from '../i18n/translations';

interface PDFGeneratorProps {
  debts: Debt[];
  schedule: MonthlySnapshot[];
  strategy: string;
  monthlyExtra: number;
  startDate: Date;
  language: Language;
  t: (key: string) => string;
}

export async function generatePaymentSchedulePDF({
  debts,
  schedule,
  strategy,
  monthlyExtra,
  startDate,
  t,
}: PDFGeneratorProps) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Layout constants
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  // Modern color scheme
  const colors = {
    text: [80, 80, 100],        // Dark gray
    accent: [0, 150, 255],      // Blue
    highlight: [255, 100, 100], // Red for extra payments
    muted: [120, 120, 140],     // Light gray
  };

  // Helper functions
  const addText = (text: string, options: {
    x?: number;
    fontSize?: number;
    isBold?: boolean;
    color?: number[];
    align?: 'left' | 'center' | 'right';
    maxWidth?: number;
  } = {}) => {
    const {
      x = margin,
      fontSize = 10,
      isBold = false,
      color = colors.text,
      align = 'left',
      maxWidth = contentWidth,
    } = options;

    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(color[0], color[1], color[2]);

    if (align === 'center') {
      doc.text(text, pageWidth / 2, y, { align: 'center', maxWidth });
    } else if (align === 'right') {
      doc.text(text, pageWidth - margin, y, { align: 'right', maxWidth });
    } else {
      doc.text(text, x, y, { align: 'left', maxWidth });
    }
  };

  const addDivider = () => {
    y += 5;
    doc.setDrawColor(colors.muted[0], colors.muted[1], colors.muted[2]);
    doc.setLineWidth(0.1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
  };

  // Title
  addText('DEBT CRUSH', {
    fontSize: 24,
    isBold: true,
    color: colors.accent,
    align: 'center',
  });
  y += 10;

  addText(t('timeline.monthlyPayments'), {
    fontSize: 14,
    color: colors.muted,
    align: 'center',
  });
  y += 15;

  // Summary section
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMonths = schedule.length;
  const debtFreeDate = schedule[schedule.length - 1]?.date;

  const summaryData = [
    [t('strategy.method'), t(`strategy.${strategy}`)],
    [t('strategy.extraPayment'), `$${monthlyExtra.toLocaleString()}`],
    [t('debts.totalDebt'), `$${totalDebt.toLocaleString()}`],
    [t('timeline.timeToDebtFree'), `${totalMonths} ${t('timeline.months')}`],
    [t('timeline.debtFreeDate'), debtFreeDate ? formatDate(debtFreeDate) : '-'],
  ];

  // Create a grid layout for summary
  const summaryGrid = {
    x: margin,
    y: y,
    cols: 2,
    rowHeight: 8,
    colWidth: contentWidth / 2,
  };

  summaryData.forEach(([label, value], index) => {
    const row = Math.floor(index / summaryGrid.cols);
    const col = index % summaryGrid.cols;
    const x = summaryGrid.x + (col * summaryGrid.colWidth);
    y = summaryGrid.y + (row * summaryGrid.rowHeight);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
    doc.text(`${label}:`, x, y);
    
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text(value, x + 60, y);
  });

  y += 25;
  addDivider();

  // Payment schedule
  addText(t('timeline.monthlyPayments'), {
    fontSize: 14,
    isBold: true,
    color: colors.accent,
  });
  y += 10;

  // Table header
  const columns = {
    date: { x: margin, width: 30 },
    name: { x: margin + 35, width: 50 },
    dueDate: { x: margin + 90, width: 25 },
    payment: { x: margin + 120, width: 35 },
    extra: { x: margin + 160, width: 35 },
  };

  // Header row
  doc.setFillColor(245, 247, 250);
  doc.rect(margin, y - 5, contentWidth, 10, 'F');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
  
  doc.text(t('strategy.startDate'), columns.date.x, y);
  doc.text(t('addDebt.name'), columns.name.x, y);
  doc.text(t('addDebt.dueDate'), columns.dueDate.x, y);
  doc.text(t('addDebt.minimumPayment'), columns.payment.x, y);
  doc.text('Extra', columns.extra.x, y);

  y += 12;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  
  schedule.forEach((month, index) => {
    if (y > pageHeight - margin * 2) {
      doc.addPage();
      y = margin;
    }

    const date = formatDate(month.date);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text(date, columns.date.x, y);

    month.payments.forEach((payment) => {
      const debt = debts.find(d => d.id === payment.debtId);
      if (debt) {
        const regularPayment = Math.min(debt.minimumPayment, payment.amount);
        const extraPayment = payment.amount - regularPayment;

        // Debt name
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        doc.text(debt.name, columns.name.x, y);

        // Due date
        doc.text(`${debt.dueDate}`, columns.dueDate.x, y);

        // Regular payment
        doc.text(`$${regularPayment.toLocaleString()}`, columns.payment.x, y);

        // Extra payment
        if (extraPayment > 0) {
          doc.setTextColor(colors.highlight[0], colors.highlight[1], colors.highlight[2]);
          doc.text(`$${extraPayment.toLocaleString()}`, columns.extra.x, y);
        }

        y += 6;
      }
    });

    if (index < schedule.length - 1) {
      doc.setDrawColor(220, 220, 230);
      doc.setLineWidth(0.1);
      doc.line(margin, y - 2, pageWidth - margin, y - 2);
    }

    y += 2;
  });

  doc.save('debt-crush-payment-schedule.pdf');
}