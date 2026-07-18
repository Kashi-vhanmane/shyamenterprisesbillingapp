import html2pdf from "html2pdf.js";

export const generatePDF = (bill) => {

  const element =
    document.getElementById("invoice");

  if (!element) {
    alert("Invoice not found");
    return;
  }

  const customerName =
    bill.customerName
      ?.replace(/[^a-zA-Z0-9]/g, "_")
      || "Customer";

  const invoiceNo =
    bill.invoiceNo || "Invoice";

  html2pdf()
    .set({
      margin: 10,

      filename:
        `${customerName}_${invoiceNo}.pdf`,

      html2canvas: {
        scale: 2,
        useCORS: true
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    })
    .from(element)
    .save();
};