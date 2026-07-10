import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ColumnsType } from 'antd/es/table';
import { columnDefs } from '../Data/Orders/All-Order/mockData';
import { returnColumnDefs } from '../Data/Orders/Retun/returnsMockData';
import { transactionColumnDefs } from '../Data/Orders/Transaction/transactionMockData';
import type { OrderRecord, ReturnRecord, TransactionRecord } from '../Types';

// Generic PDF export helper for the CommonTable component itself
export const exportToPDF = <T,>( data: T[], columns: ColumnsType<T>, visibleColumns: string[], titleText = 'EXPORTED TABLE DATA' ) => {
  const activeCols = columns.filter((col) => {
    const colKey = col.key || ('dataIndex' in col ? col.dataIndex : undefined);
    if (!colKey) return false;
    const colKeyStr = String(colKey).toLowerCase();
    const colTitleStr = String(col.title || '').toLowerCase();
    if (colKeyStr === 'actions' || colKeyStr === 'action' || colTitleStr === 'action') {
      return false;
    }
    return visibleColumns.includes(String(colKey));
  });

  if (activeCols.length === 0) {
    throw new Error('No visible columns available to export.');
  }

  const doc = new jsPDF({ orientation: 'landscape' });

  // Header title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(102, 71, 236);
  doc.text(titleText, 14, 20);

  // Generation timestamp
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

  const headers = activeCols.map((col) => String(col.title || col.key || ('dataIndex' in col ? col.dataIndex : '')));
  const bodyData = data.map((item) =>
    activeCols.map((col) => {
      const colKey = col.key || ('dataIndex' in col ? col.dataIndex : undefined);
      const val = colKey && !Array.isArray(colKey) ? item[colKey as keyof T] : undefined;
      return val !== undefined ? String(val) : '';
    })
  );

  autoTable(doc, {
    startY: 35,
    head: [headers],
    body: bodyData,
    theme: 'grid',
    headStyles: {
      fillColor: [102, 71, 236],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [51, 65, 85],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  const filename = `report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
};

// Specialized PDF export for Orders
export const exportOrdersToPDF = (orders: OrderRecord[], visibleColumnKeys: string[]) => {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Add document title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(102, 71, 236);
  doc.text('ORDERS REPORT', 14, 20);

  // Add generation details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); 
  const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  doc.text(`Generated on: ${timestamp}`, 14, 28);

  // Summary statistics calculation
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85); 
  doc.text(`Total Orders: ${orders.length}`, 14, 38);
  doc.text(`Total Volume: $${totalAmount.toFixed(2)}`, 80, 38);

  const activeColumns = columnDefs.filter((col) => visibleColumnKeys.includes(col.key));

  const headers = activeColumns.map((col) => col.header);

  const data = orders.map((order) => activeColumns.map((col) => col.mapper(order)));

  // Build dynamic column styles mapping
  const colStyles: { [key: number]: { halign?: 'left' | 'center' | 'right'; fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic' } } = {};
  activeColumns.forEach((col, index) => {
    colStyles[index] = {};
    if (col.align) {
      colStyles[index].halign = col.align as 'left' | 'center' | 'right';
    }
    if (col.key === 'id' || col.key === 'customerName' || col.key === 'amount') {
      colStyles[index].fontStyle = 'bold';
    }
  });

  // Generate table using autotable
  autoTable(doc, {
    startY: 44,
    head: [headers],
    body: data,
    theme: 'grid',
    headStyles: { fillColor: [102, 71, 236], textColor: [255, 255, 255], fontSize: 10, fontStyle: 'bold', halign: 'left', },
    bodyStyles: { fontSize: 9, textColor: [51, 65, 85], },
    alternateRowStyles: { fillColor: [248, 250, 252], },
    margin: { left: 14, right: 14 },
    styles: { font: 'helvetica', cellPadding: 4, },
    columnStyles: colStyles,
    didDrawPage: (data) => {
      // Footer page numbering
      const str = `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(str, doc.internal.pageSize.width - 14 - doc.getTextWidth(str), doc.internal.pageSize.height - 10);
    },
  });

  // Save PDF using dynamic blob download
  const filename = `orders_report_${new Date().toISOString().slice(0, 10)}.pdf`;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Specialized PDF export for Returns & Refunds
export const exportReturnsToPDF = (returns: ReturnRecord[], visibleColumnKeys: string[]) => {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Add document title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(102, 71, 236);
  doc.text('RETURNS & REFUNDS REPORT', 14, 20);

  // Add generation details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); 
  const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  doc.text(`Generated on: ${timestamp}`, 14, 28);

  // Summary statistics calculation
  const totalAmount = returns.reduce((sum, item) => sum + item.refundAmount, 0);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85); 
  doc.text(`Total Returns: ${returns.length}`, 14, 38);
  doc.text(`Total Refund Volume: $${totalAmount.toFixed(2)}`, 80, 38);

  // Filter columns based on visibleColumnKeys
  const activeColumns = returnColumnDefs.filter((col) => visibleColumnKeys.includes(col.key));

  const headers = activeColumns.map((col) => col.header);

  const data = returns.map((item) => activeColumns.map((col) => col.mapper(item)));

  // Build dynamic column styles mapping
  const colStyles: { [key: number]: { halign?: 'left' | 'center' | 'right'; fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic' } } = {};
  activeColumns.forEach((col, index) => {
    colStyles[index] = {};
    if (col.align) {
      colStyles[index].halign = col.align as 'left' | 'center' | 'right';
    }
    if (col.key === 'id' || col.key === 'customerName' || col.key === 'refundAmount') {
      colStyles[index].fontStyle = 'bold';
    }
  });

  // Generate table using autotable
  autoTable(doc, {
    startY: 44,
    head: [headers],
    body: data,
    theme: 'grid',
    headStyles: { fillColor: [102, 71, 236], textColor: [255, 255, 255], fontSize: 10, fontStyle: 'bold', halign: 'left', },
    bodyStyles: { fontSize: 9, textColor: [51, 65, 85], },
    alternateRowStyles: { fillColor: [248, 250, 252], },
    margin: { left: 14, right: 14 },
    styles: { font: 'helvetica', cellPadding: 4, },
    columnStyles: colStyles,
    didDrawPage: (data) => {
      // Footer page numbering
      const str = `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(str, doc.internal.pageSize.width - 14 - doc.getTextWidth(str), doc.internal.pageSize.height - 10);
    },
  });

  // Save PDF using dynamic blob download
  const filename = `returns_report_${new Date().toISOString().slice(0, 10)}.pdf`;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Specialized PDF export for Transactions
export const exportTransactionsToPDF = (transactions: TransactionRecord[], visibleColumnKeys: string[]) => {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Add document title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(102, 71, 236); // Indigo theme
  doc.text('TRANSACTION HISTORY REPORT', 14, 20);

  // Add generation details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  doc.text(`Generated on: ${timestamp}`, 14, 28);

  // Summary statistics calculation
  const totalAmount = transactions.reduce((sum, item) => sum + item.amount, 0);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text(`Total Transactions: ${transactions.length}`, 14, 38);
  doc.text(`Total Amount Volume: $${totalAmount.toFixed(2)}`, 80, 38);

  const activeColumns = transactionColumnDefs.filter((col) => visibleColumnKeys.includes(col.key));

  const headers = activeColumns.map((col) => col.header);

  const data = transactions.map((item) => activeColumns.map((col) => col.mapper(item)));

  const colStyles: { [key: number]: { halign?: 'left' | 'center' | 'right'; fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic' } } = {};
  activeColumns.forEach((col, index) => {
    colStyles[index] = {};
    if (col.align) {
      colStyles[index].halign = col.align as 'left' | 'center' | 'right';
    }
    if (col.key === 'id' || col.key === 'customerName' || col.key === 'amount') {
      colStyles[index].fontStyle = 'bold';
    }
  });

  // Generate table using autotable
  autoTable(doc, {
    startY: 44,
    head: [headers],
    body: data,
    theme: 'grid',
    headStyles: { fillColor: [102, 71, 236], textColor: [255, 255, 255], fontSize: 10, fontStyle: 'bold', halign: 'left', },
    bodyStyles: { fontSize: 9, textColor: [51, 65, 85], },
    alternateRowStyles: { fillColor: [248, 250, 252], },
    margin: { left: 14, right: 14 },
    styles: { font: 'helvetica', cellPadding: 4, },
    columnStyles: colStyles,
    didDrawPage: (data) => {
      // Footer page numbering
      const str = `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(str, doc.internal.pageSize.width - 14 - doc.getTextWidth(str), doc.internal.pageSize.height - 10);
    },
  });

  // Save PDF using dynamic blob download
  const filename = `transactions_report_${new Date().toISOString().slice(0, 10)}.pdf`;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};