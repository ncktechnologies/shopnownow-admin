import React from "react";

const RiderDocuments = ({ doc }) => {
  return (
    <>
      {doc === null ? (
        <div>No documents uploaded by this rider</div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div>
          <img
            src={doc?.vehicle_license}
            alt="Vehicle license"
            style={{
              height: "500px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <div>Vehicle License</div>
          </div>
        
        <div>
        <img
            src={doc?.hackney_permit}
            alt="Hackney permit"
            style={{
              height: "500px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <div>Hackney Permit</div>
        </div>
         
         <div>
         <img
            src={doc?.mot}
            alt="mot"
            style={{
              height: "500px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />{" "}
          <div>MoT</div>
         </div>
         
         <div>
         <img
            src={doc?.insurance}
            alt="insurance"
            style={{
              height: "500px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <div>Insurance</div>
         </div>
         
         <div>
         <img
            src={doc?.road_worthiness}
            alt="Road worthiness"
            style={{ height: "500px", width: "auto", objectFit: "contain" }}
          />
          <div>Road Worthiness</div>
         </div>
         
        </div>
      )}
    </>
  );
};

export default RiderDocuments;
