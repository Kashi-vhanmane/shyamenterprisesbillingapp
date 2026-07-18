import React from "react";

export default function ProductTable({
  products,
  setProducts
}) {

  const addProduct = () => {

    const product = {
      id: Date.now(),
      name: "",
      price: "",
      qty: "",
      total: 0
    };

    setProducts([
      ...products,
      product
    ]);
  };

  const updateProduct = (
    index,
    field,
    value
  ) => {

    const updated = [...products];

    updated[index][field] = value;

    updated[index].total =
      (Number(
        updated[index].price
      ) || 0) *
      (Number(
        updated[index].qty
      ) || 0);

    setProducts(updated);
  };

  const deleteProduct = (
    id
  ) => {

    setProducts(
      products.filter(
        (p) => p.id !== id
      )
    );
  };

  return (

    <div className="card mb-3">

      <div className="card-header d-flex justify-content-between align-items-center">

        <h5 className="mb-0">
          Products
        </h5>

        <button
          className="btn btn-success"
          onClick={addProduct}
        >
          Add Product
        </button>

      </div>

      <div className="card-body">

        <table className="table table-bordered align-middle">

          <thead className="table-light">

            <tr>
              <th width="60">
                ID
              </th>

              <th>
                Product Name
              </th>

              <th width="150">
                Price
              </th>

              <th width="150">
                Qty
              </th>

              <th width="150">
                Total
              </th>

              <th width="120">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {products.length === 0 && (

              <tr>

                <td
                  colSpan="6"
                  className="text-center text-muted"
                >
                  No Products Added
                </td>

              </tr>

            )}

            {products.map(
              (
                product,
                index
              ) => (

                <tr
                  key={product.id}
                >

                  <td>
                    {index + 1}
                  </td>

                  <td>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Product Name"
                      value={
                        product.name
                      }
                      onChange={(
                        e
                      ) =>
                        updateProduct(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={
                        product.price
                      }
                      onChange={(
                        e
                      ) =>
                        updateProduct(
                          index,
                          "price",
                          e.target.value ===
                            ""
                            ? ""
                            : Number(
                                e.target.value
                              )
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Qty"
                      value={
                        product.qty
                      }
                      onChange={(
                        e
                      ) =>
                        updateProduct(
                          index,
                          "qty",
                          e.target.value ===
                            ""
                            ? ""
                            : Number(
                                e.target.value
                              )
                        )
                      }
                    />

                  </td>

                  <td>

                    {product.total >
                    0
                      ? `₹${product.total}`
                      : ""}

                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}