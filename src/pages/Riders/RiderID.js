import React from "react";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";



const RiderID = ({ id }) => {


  return (
    <StyledContainer>
      <div className="flex flex-col content">
       
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Means of ID:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {id?.means_of_id_type}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <div>
          <img
            src={id?.means_of_id}
            alt="Vehicle license"
            style={{
              height: "500px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <div>Means of ID</div>
          </div>
        
        <div>
        <img
            src={id?.rider_card}
            alt="Hackney permit"
            style={{
              height: "500px",
              width: "auto",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <div>Rider Card</div>
        </div>
         </div>
       
      </div>
   
    </StyledContainer>
  );
};

export default RiderID;

const StyledContainer = styled.div`
  .content {
    color: #000;
    padding-top: 20px;
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`;
