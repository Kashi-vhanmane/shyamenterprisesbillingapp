import React from "react";

export default function Header() {
  return (
    <div
      className="card shadow-sm mb-4"
      style={{
        borderRadius: "15px",
        overflow: "hidden"
      }}
    >
      <div
        className="row g-0 align-items-center"
        style={{
          background:
            "linear-gradient(135deg, #1c1f23, #27282a)",
          color: "white",
          padding: "20px"
        }}
      >
        {/* Logo */}

        <div className="col-md-2 text-center">
          <img
            src="logo.png"
            alt="Logo"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              background: "#fff",
              borderRadius: "10px",
              padding: "5px"
            }}
          />
        </div>

        {/* Company Details */}

        <div className="col-md-10">

          <h1
            style={{
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            SHYAM ENTERPRISES
          </h1>

          <p className="mb-2">
  <i className="bi bi-geo-alt-fill me-2"></i>
  Gavali Vasti, Laxmi Peth 132,
  Degaon Road, Solapur
</p>

<p className="mb-2">
  <i className="bi bi-telephone-fill me-2"></i>
  +91 9209751802
</p>

<p className="mb-2">
  <i className="bi bi-envelope-fill me-2"></i>
  shyamenterprises@gmail.com
</p>

<p className="mb-0">
  <i className="bi bi-receipt me-2"></i>
  GSTIN : 27ENRPS6450Q1ZQ
</p>
        </div>
      </div>
    </div>
  );
}