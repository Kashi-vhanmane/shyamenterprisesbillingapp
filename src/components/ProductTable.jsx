import React from "react";

export default function ProductTable({
  products,
  setProducts
}) {

  const addProduct = () => {

    const product = {
      id: Date.now(),
      name: "",
      price: 0,
      qty: 1,
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
      updated[index].price *
      updated[index].qty;

    setProducts(updated);
  };

  const deleteProduct = (id) => {

    setProducts(
      products.filter(
        (p) => p.id !== id
      )
    );
  };

  return (
    <div className="card mb-3">

      <div className="card-header d-flex justify-content-between">

        <span>Products</span>

        <button
          className="btn btn-success btn-sm"
          onClick={addProduct}
        >
          Add Product
        </button>

      </div>

      <div className="card-body">

        <table className="table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map(
              (product, index) => (

                <tr key={product.id}>

                  <td>{index + 1}</td>

                  <td>
                    <input
                      className="form-control"
                      value={product.name}
                      onChange={(e) =>
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
                      value={product.price}
                      onChange={(e) =>
                        updateProduct(
                          index,
                          "price",
                          Number(
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
                      value={product.qty}
                      onChange={(e) =>
                        updateProduct(
                          index,
                          "qty",
                          Number(
                            e.target.value
                          )
                        )
                      }
                    />
                  </td>

                  <td>
                    ₹{product.total}
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