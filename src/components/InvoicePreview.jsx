import React from "react";
import logo from "../assets/logo.png";
import stamp from "../assets/stamp_1.png";

export default function InvoicePreview({ bill }) {

  if (!bill) return null;

  return (
    <div
      id="invoice"
      className="invoice-preview card mt-4"
      style={{
        padding: "20px",
        backgroundColor: "white",
        color: "black"
      }}
    >

      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid #000",
          paddingBottom: "10px",
          marginBottom: "20px"
        }}
      >

        <img
          src={logo}
          alt="Logo"
          width="100"
          style={{
            marginRight: "20px"
          }}
        />

        <div style={{ flex: 1 }}>

          <h2
            style={{
              margin: 0,
              textAlign: "center"
            }}
          >
            Shyam Enterprises
          </h2>

          <p
            style={{
              margin: 0,
              textAlign: "center"
            }}
          >
            GAVALI VASTI, LAXMI PETH 132,
            DEGAON ROAD
          </p>

          <p
            style={{
              margin: 0,
              textAlign: "center"
            }}
          >
            SOLAPUR, Maharashtra
          </p>

          <p
            style={{
              margin: 0,
              textAlign: "center"
            }}
          >
            Phone: +91 9209751802
          </p>

          <p
            style={{
              margin: 0,
              textAlign: "center"
            }}
          >
            GSTIN :
            27ENRPS6450Q1ZQ
          </p>

        </div>

      </div>

      {/* Invoice Details */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "15px"
        }}
      >

        <div>
          <strong>
            Invoice No:
          </strong>{" "}
          {bill.invoiceNo}
        </div>

        <div>
          <strong>Date:</strong>{" "}
          {new Date().toLocaleDateString()}
        </div>

      </div>

      {/* Customer Details */}

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <h5>
          Customer Details
        </h5>

        <p>
          <strong>Name:</strong>{" "}
          {bill.customerName}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {bill.phone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {bill.address}
        </p>

      </div>

      {/* Product Table */}

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
          marginBottom: "20px"
        }}
      >

        <thead>

          <tr>

            <th
              style={tableHeader}
            >
              ID
            </th>

            <th
              style={tableHeader}
            >
              Product
            </th>

            <th
              style={tableHeader}
            >
              Price
            </th>

            <th
              style={tableHeader}
            >
              Qty
            </th>

            <th
              style={tableHeader}
            >
              Amount
            </th>

          </tr>

        </thead>

        <tbody>

          {bill.products.map(
            (
              product,
              index
            ) => (

              <tr key={index}>

                <td
                  style={
                    tableCell
                  }
                >
                  {index + 1}
                </td>

                <td
                  style={
                    tableCell
                  }
                >
                  {product.name}
                </td>

                <td
                  style={
                    tableCell
                  }
                >
                  Rs.{" "}
                  {
                    product.price
                  }
                </td>

                <td
                  style={
                    tableCell
                  }
                >
                  {product.qty}
                </td>

                <td
                  style={
                    tableCell
                  }
                >
                  Rs.{" "}
                  {
                    product.total
                  }
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

      {/* Totals */}

    <div
  style={{
    textAlign: "right"
  }}
>

  <p>
    <strong>Sub Total :</strong> Rs. {bill.subTotal}
  </p>

  <p>
    <strong>CGST ({bill.cgst}%) :</strong> Rs. {bill.cgstAmount}
  </p>

  <p>
    <strong>SGST ({bill.sgst}%) :</strong> Rs. {bill.sgstAmount}
  </p>

  <h4>
    Grand Total : Rs. {bill.total}
  </h4>

</div>
      {/* Footer */}

      <div
  style={{
    marginTop: "50px",
    borderTop: "1px solid #000",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>

  <div>
    <h5>Thank You For Your Business</h5>
  </div>

  <div
    style={{
      textAlign: "center"
    }}
  >

    <img
      src={stamp}
      alt="Company Stamp"
      style={{
        width: "200px",
        height: "80px",
        objectFit: "contain"
      }}
    />

    <br />

    <strong>
      Authorized Signatory
    </strong>

  </div>

</div>
    </div>
  );
}

const tableHeader = {
  border: "1px solid black",
  padding: "8px",
  backgroundColor: "#f2f2f2"
};

const tableCell = {
  border: "1px solid black",
  padding: "8px"
};