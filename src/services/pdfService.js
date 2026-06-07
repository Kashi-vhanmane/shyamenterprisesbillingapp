import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import logo from "../assets/logo.png";

export const generatePDF = (bill) => {

  const doc = new jsPDF();

  const img = new Image();

  img.src = logo;

  img.onload = () => {

    // ======================
    // COMPANY HEADER
    // ======================

    doc.addImage(
      img,
      "PNG",
      14,
      10,
      25,
      25
    );

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(
      "ASCII EDUCATION",
      105,
      20,
      { align: "center" }
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
      "GAVALI VASTI, LAXMI PETH 132 DEGAON ROAD",
      105,
      28,
      { align: "center" }
    );

    doc.text(
      "SOLAPUR, Maharashtra",
      105,
      34,
      { align: "center" }
    );

    doc.text(
      "Phone : +91 9209751802",
      105,
      40,
      { align: "center" }
    );

    doc.text(
      "GSTIN : 27ENRPS6450Q1ZQ",
      105,
      46,
      { align: "center" }
    );

    doc.line(10, 52, 200, 52);

    // ======================
    // INVOICE INFO
    // ======================

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text(
      `Invoice No : ${bill.invoiceNo}`,
      14,
      65
    );

    doc.text(
      `Date : ${new Date().toLocaleDateString()}`,
      140,
      65
    );

    // ======================
    // CUSTOMER DETAILS
    // ======================

    doc.setFontSize(13);

    doc.text(
      "Customer Details",
      14,
      80
    );

    doc.setFont("helvetica", "normal");

    doc.text(
      `Name : ${bill.customerName}`,
      14,
      90
    );

    doc.text(
      `Phone : ${bill.phone}`,
      14,
      98
    );

    doc.text(
      `Address : ${bill.address || "-"}`,
      14,
      106
    );

    // ======================
    // PRODUCT TABLE
    // ======================

    autoTable(doc, {
      startY: 115,

      head: [
        [
          "ID",
          "Product",
          "Price",
          "Qty",
          "Amount"
        ]
      ],

      body: bill.products.map(
        (product, index) => [
          index + 1,
          product.name,
          `Rs. ${product.price}`,
          product.qty,
          `Rs. ${product.total}`
        ]
      ),

      theme: "grid",

      styles: {
        fontSize: 10
      },

      headStyles: {
        fillColor: [41, 128, 185]
      }
    });

    const finalY =
      doc.lastAutoTable.finalY + 10;

    // ======================
    // TOTAL SECTION
    // ======================

    doc.setFont("helvetica", "bold");

    doc.text(
      `Sub Total : Rs. ${bill.subTotal}`,
      130,
      finalY
    );

    doc.text(
      `GST : Rs. ${bill.gstAmount}`,
      130,
      finalY + 8
    );

    doc.text(
      `Grand Total : Rs. ${bill.total}`,
      130,
      finalY + 16
    );

    // ======================
    // AMOUNT IN WORDS
    // ======================

    doc.setFontSize(11);

    doc.text(
      "Amount In Words :",
      14,
      finalY + 35
    );

    doc.text(
      `${numberToWords(
        Math.round(
          Number(bill.total)
        )
      )} Rupees Only`,
      14,
      finalY + 43
    );

    // ======================
    // FOOTER
    // ======================

    doc.line(
      10,
      finalY + 55,
      200,
      finalY + 55
    );

    doc.text(
      "Thank You For Your Business",
      14,
      finalY + 65
    );

    doc.text(
      "Authorized Signature",
      140,
      finalY + 65
    );

    doc.save(
      `${bill.invoiceNo}.pdf`
    );
  };
};

// ======================
// NUMBER TO WORDS
// ======================

function numberToWords(num) {

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen"
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety"
  ];

  if (num < 20) {
    return ones[num];
  }

  if (num < 100) {
    return (
      tens[Math.floor(num / 10)] +
      " " +
      ones[num % 10]
    );
  }

  if (num < 1000) {
    return (
      ones[Math.floor(num / 100)] +
      " Hundred " +
      numberToWords(num % 100)
    );
  }

  if (num < 100000) {
    return (
      numberToWords(
        Math.floor(num / 1000)
      ) +
      " Thousand " +
      numberToWords(num % 1000)
    );
  }

  return num.toString();
}