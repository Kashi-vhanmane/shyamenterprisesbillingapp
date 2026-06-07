import React, { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import CustomerForm from "./components/CustomerForm";
import ProductTable from "./components/ProductTable";
import BillSummary from "./components/BillSummary";
import BillHistory from "./components/BillHistory";

import {
  getBills,
  saveBill,
  deleteBill as removeBill
} from "./services/storageService";

import { generatePDF } from "./services/pdfService";

import {
  exportExcel,
  exportCSV
} from "./services/exportService";

function App() {

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [products, setProducts] = useState([]);

  const [gst, setGst] = useState(18);

  const [bills, setBills] = useState([]);

  useEffect(() => {
    setBills(getBills());
  }, []);

  const calculateSubtotal = () => {
    return products.reduce(
      (sum, item) => sum + item.total,
      0
    );
  };

 

  const handleGeneratePDF = () => {

  if (!customer.name) {
    alert("Enter Customer Name");
    return;
  }

  if (products.length === 0) {
    alert("Add at least one product");
    return;
  }

  const subtotal = calculateSubtotal();

  const gstAmount =
    (subtotal * gst) / 100;

  const grandTotal =
    subtotal + gstAmount;

  const bill = {
    invoiceNo:
      "INV-" + Date.now(),

    date:
      new Date()
        .toISOString()
        .split("T")[0],

    customerName:
      customer.name,

    phone:
      customer.phone,

    address:
      customer.address,

    products,

    subTotal:
      subtotal.toFixed(2),

    gst,

    gstAmount:
      gstAmount.toFixed(2),

    total:
      grandTotal.toFixed(2)
  };

  // Save bill
  saveBill(bill);

  // Refresh history
  setBills(getBills());

  // Generate PDF
  generatePDF(bill);

  // Clear Form
  setCustomer({
    name: "",
    phone: "",
    address: ""
  });

  setProducts([]);

  alert("Bill Generated Successfully");
};




  const handleDeleteBill = (
    invoiceNo
  ) => {

    removeBill(invoiceNo);

    setBills(getBills());
  };

  const handleExportExcel = () => {

    exportExcel(bills);

    if (
      window.confirm(
        "Delete bills after export?"
      )
    ) {

      localStorage.removeItem(
        "bills"
      );

      setBills([]);
    }
  };

  const handleExportCSV = () => {

    exportCSV(bills);

    if (
      window.confirm(
        "Delete bills after export?"
      )
    ) {

      localStorage.removeItem(
        "bills"
      );

      setBills([]);
    }
  };
const downloadBillPdf = (
  bill
) => {
  generatePDF(bill);
};

const handleEditBill = (
  bill
) => {

  setCustomer({
    name: bill.customerName,
    phone: bill.phone,
    address: bill.address
  });

  setProducts(
    bill.products
  );

  setGst(
    bill.gst || 18
  );
};
  return (

    <div className="container mt-4">

      <Header />

      <CustomerForm
        customer={customer}
        setCustomer={setCustomer}
      />

      <ProductTable
        products={products}
        setProducts={setProducts}
      />

      <BillSummary
        products={products}
        gst={gst}
        setGst={setGst}
      />

      <div className="mb-3">

       

        <button
          className="btn btn-success me-2"
          onClick={handleGeneratePDF}
        >
          Generate PDF
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={handleExportExcel}
        >
          Export Excel
        </button>

        <button
          className="btn btn-info"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>

      </div>

      <BillHistory
  bills={bills}
  deleteBill={handleDeleteBill}
  downloadBillPdf={downloadBillPdf}
  editBill={handleEditBill}
/>

    </div>
  );
}

export default App;