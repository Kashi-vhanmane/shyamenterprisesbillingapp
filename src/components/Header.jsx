import React from "react";

export default function Header() {
  return (
    <div className="bg-dark text-white p-4 rounded mb-3">
      <div className="row align-items-center">

        <div className="col-md-2">
          <img
            src="logo.png"
            alt="Logo"
            width="150"
             className="mb-5"
          />
        </div>

        <div className="col-md-10">
          <h2>Shyam Enterprises</h2>

          <p className="mb-0">
           GAVALI VASTI, LAXMI PETH 132 DEGAON ROAD solapur
          </p>

          <p className="mb-0">
            Phone : +91 9209751802
          </p>

          <p className="mb-0">
            GSTIN : 27ENRPS6450Q1ZQ
          </p>
        </div>

      </div>
    </div>
  );
}