import React from "react";

export default function BillSummary({
  products,
  gst,
  setGst
}) {

  const subtotal = products.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const gstAmount =
    (subtotal * gst) / 100;

  const grandTotal =
    subtotal + gstAmount;

  return (
    <div className="card mb-3">

      <div className="card-header">
        Bill Summary
      </div>

      <div className="card-body">

        <div className="row">

          <div className="col-md-4">
            <label>GST %</label>

            <input
              type="number"
              className="form-control"
              value={gst}
              onChange={(e) =>
                setGst(
                  Number(
                    e.target.value
                  )
                )
              }
            />
          </div>

        </div>

        <hr />

        <h5>
          Sub Total :
          ₹{subtotal.toFixed(2)}
        </h5>

        <h5>
          GST Amount :
          ₹{gstAmount.toFixed(2)}
        </h5>

        <h4 className="text-success">
          Grand Total :
          ₹{grandTotal.toFixed(2)}
        </h4>

      </div>

    </div>
  );
}