import React from "react";
import "./AdoptChild.css";

const AdoptChild = () => {
  return (
    <div className="adopt-child-container">
      <h1>👶 Child Adoption Guidelines</h1>
      <p>
        Adopting a child is a noble and responsible act. Please read the rules 
        and regulations carefully before proceeding with the adoption process.
      </p>

      <section className="rules-section">
        <h2>Eligibility Criteria</h2>
        <ul>
          <li>Adopters must be legally married, single, or widowed as per local laws.</li>
          <li>Age of adopter should be at least 25 years and not more than 55 years.</li>
          <li>Adopters must have financial and emotional stability to care for a child.</li>
        </ul>
      </section>

      <section className="rules-section">
        <h2>Legal Requirements</h2>
        <ul>
          <li>Adoption must comply with the Juvenile Justice Act and other relevant laws.</li>
          <li>All adoptions must be registered and approved by a recognized adoption agency.</li>
          <li>No adoption is allowed for personal monetary or illegal purposes.</li>
        </ul>
      </section>

      <section className="rules-section">
        <h2>Documentation Needed</h2>
        <ul>
          <li>Proof of identity (Aadhaar, Passport, or PAN card).</li>
          <li>Proof of residence (Utility bills, Passport, or Ration card).</li>
          <li>Medical certificate of fitness.</li>
          <li>Marriage certificate (if applicable).</li>
          <li>Income proof and financial statements.</li>
        </ul>
      </section>

      <section className="rules-section">
        <h2>Adoption Process</h2>
        <ul>
          <li>Register with a recognized adoption agency.</li>
          <li>Home study and counseling will be conducted by social workers.</li>
          <li>Approval of adoption from the relevant authority.</li>
          <li>Legal formalities and court orders to finalize adoption.</li>
        </ul>
      </section>

      <section className="rules-section">
        <h2>Important Notes</h2>
        <ul>
          <li>Adopters are responsible for the welfare, education, and healthcare of the child.</li>
          <li>Illegal adoption or trafficking of children is a punishable offense.</li>
          <li>Adopted child’s rights are protected under law.</li>
        </ul>
      </section>

      <div className="contact-info">
        <h3>For Assistance:</h3>
        <p>Contact our NGO or authorized adoption agencies for guidance and support.</p>
      </div>
    </div>
  );
};

export default AdoptChild;
