import React from "react";

function BillSummary({
  products,
  cgst,
  sgst,
  setCGST,
  setSGST
}) {

  const subtotal = products.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const cgstAmount = (subtotal * cgst) / 100;
  const sgstAmount = (subtotal * sgst) / 100;

  const grandTotal =
    subtotal +
    cgstAmount +
    sgstAmount;

  return (
    <div className="card mb-3">

      <div className="card-header">
        Bill Summary
      </div>

      <div className="card-body">

        <div className="row">

          <div className="col-md-6">
            <label>CGST %</label>

            <input
              type="number"
              className="form-control"
              value={cgst}
              onChange={(e) =>
                setCGST(Number(e.target.value))
              }
            />
          </div>

          <div className="col-md-6">
            <label>SGST %</label>

            <input
              type="number"
              className="form-control"
              value={sgst}
              onChange={(e) =>
                setSGST(Number(e.target.value))
              }
            />
          </div>

        </div>

        <hr />

        <h5>
          Sub Total : ₹ {subtotal.toFixed(2)}
        </h5>

        <h5>
          CGST ({cgst}%) : ₹ {cgstAmount.toFixed(2)}
        </h5>

        <h5>
          SGST ({sgst}%) : ₹ {sgstAmount.toFixed(2)}
        </h5>

        <h4 className="text-success">
          Grand Total : ₹ {grandTotal.toFixed(2)}
        </h4>

      </div>
      <div className="text-end mt-5">

    <img
        src="../assets/sampt_1.png"
        alt="Company Stamp"
        style={{
            width: "120px",
            height: "120px",
            objectFit: "contain"
        }}
    />

    <h6 className="mt-2">
        Authorized Signatory
    </h6>

</div>

    </div>
  );
}

export default BillSummary;