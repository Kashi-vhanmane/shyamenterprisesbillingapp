import React, { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import CustomerForm from "./components/CustomerForm";
import ProductTable from "./components/ProductTable";
import BillSummary from "./components/BillSummary";
import BillHistory from "./components/BillHistory";
import InvoicePreview from "./components/InvoicePreview";

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

  // const [customer, setCustomer] = useState({
  //   name: "",
  //   phone: "",
  //   address: ""
  // });

  const [customer, setCustomer] = useState({
  invoiceNo: "",
  name: "",
  phone: "",
  address: ""
});

  const [products, setProducts] = useState([]);

  const [gst, setGst] = useState(18);
  const [sgst,setSGST]=useState(9);
  const [cgst,setCGST]=useState(9);

  const [bills, setBills] = useState([]);

  const [selectedBill, setSelectedBill] =
    useState(null);

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

    // const subtotal =
    //   calculateSubtotal();

    const gstAmount =
      (subtotal * gst) / 100;

    const grandTotal =
      subtotal + gstAmount;

    // const bill = {
    //   invoiceNo:
    //     "INV-" + Date.now(),

    //   date:
    //     new Date()
    //       .toISOString()
    //       .split("T")[0],

    //   customerName:
    //     customer.name,

    //   phone:
    //     customer.phone,

    //   address:
    //     customer.address,

    //   products: [...products],

    //   subTotal:
    //     subtotal.toFixed(2),

    //   gst,

    //   gstAmount:
    //     gstAmount.toFixed(2),

    //   total:
    //     grandTotal.toFixed(2)
    // };

    const bill = {
  //invoiceNo: "INV-" + Date.now(),
  invoiceNo: customer.invoiceNo,

  date: new Date().toISOString().split("T")[0],

  customerName: customer.name,
  phone: customer.phone,
  address: customer.address,

  products: [...products],

  subTotal: subtotal.toFixed(2),

  cgst,
  sgst,

  cgstAmount: cgstAmount.toFixed(2),
  sgstAmount: sgstAmount.toFixed(2),

  totalGST: totalGST.toFixed(2),

  total: grandTotal.toFixed(2)
};

    setSelectedBill(bill);

    saveBill(bill);

    setBills(getBills());

    setTimeout(() => {

      //generatePDF();
      generatePDF(bill);


      setTimeout(() => {

        // setCustomer({
        //   name: "",
        //   phone: "",
        //   address: ""
        // });
        setCustomer({
  invoiceNo: "",
  name: "",
  phone: "",
  address: ""
});

        setProducts([]);

        alert(
          "Bill Generated Successfully"
        );

      }, 500);

    }, 300);
  };

  const handleDeleteBill = (
    invoiceNo
  ) => {

    removeBill(invoiceNo);

    setBills(getBills());
  };

  const handleEditBill = (
    bill
  ) => {

    // setCustomer({
    //   name: bill.customerName,
    //   phone: bill.phone,
    //   address: bill.address
    // });
    setCustomer({
  invoiceNo: bill.invoiceNo,
  name: bill.customerName,
  phone: bill.phone,
  address: bill.address
});

    setProducts(
      bill.products
    );

    setCGST(bill.cgst || 9);
setSGST(bill.sgst || 9);
  };

  const downloadBillPdf = (
    bill
  ) => {

    setSelectedBill(bill);

    setTimeout(() => {
      //generatePDF();
      generatePDF(bill);
    }, 300);
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

  // const subtotal =
  //   calculateSubtotal();
  const subtotal = calculateSubtotal();

const cgstAmount = (subtotal * cgst) / 100;
const sgstAmount = (subtotal * sgst) / 100;

const totalGST = cgstAmount + sgstAmount;

const grandTotal = subtotal + totalGST;

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

      {/* <BillSummary
        products={products}
        gst={gst}
        setGst={setGst}
      /> */}

      <BillSummary
    products={products}
    cgst={cgst}
    sgst={sgst}
    setCGST={setCGST}
    setSGST={setSGST}
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

      {/* Hidden Invoice For PDF */}

      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          width: "800px",
          background: "#fff"
        }}
      >
        <InvoicePreview
          bill={selectedBill}
        />
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