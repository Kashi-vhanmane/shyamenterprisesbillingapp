import React from "react";

export default function BillHistory({
  bills,
  deleteBill,
  downloadBillPdf,
  editBill
}) {

  return (
    <div className="card mt-4">

      <div className="card-header">
        Bill History
      </div>

      <div className="card-body">

        <table className="table table-bordered table-striped">

          <thead>

            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>PDF</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>

          </thead>

          <tbody>

            {bills.length > 0 ? (

              bills.map((bill) => (

                <tr key={bill.invoiceNo}>

                  <td>{bill.invoiceNo}</td>

                  <td>{bill.customerName}</td>

                  <td>{bill.date}</td>

                  <td>Rs. {bill.total}</td>

                  <td>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        downloadBillPdf(bill)
                      }
                    >
                      PDF
                    </button>

                  </td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        editBill(bill)
                      }
                    >
                      Edit
                    </button>

                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteBill(
                          bill.invoiceNo
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="7"
                  className="text-center"
                >
                  No Bills Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}