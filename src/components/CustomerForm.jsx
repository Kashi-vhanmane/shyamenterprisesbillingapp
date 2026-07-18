import React from "react";

export default function CustomerForm({
  customer,
  setCustomer
}) {

  return (

    <div className="card mb-3">
    <div>
        <input
  className="form-control mb-3"
  placeholder="Invoice Number"
  value={customer.invoiceNo}
  onChange={(e) =>
    setCustomer({
      ...customer,
      invoiceNo: e.target.value
    })
  }
/>
      </div>
      <div className="card-header">
        Customer Details
      </div>
  

      <div className="card-body">
        

        <input
          className="form-control mb-2"
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({
              ...customer,
              name: e.target.value
            })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({
              ...customer,
              phone: e.target.value
            })
          }
        />

        <textarea
          className="form-control"
          placeholder="Address"
          value={customer.address}
          onChange={(e) =>
            setCustomer({
              ...customer,
              address: e.target.value
            })
          }
        />

      </div>

    </div>
  );
}