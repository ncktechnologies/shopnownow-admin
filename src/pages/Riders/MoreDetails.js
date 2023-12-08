import React from "react";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";



const MoreDetails = ({ details }) => {


  return (
    <StyledContainer>
      <div className="flex flex-col content">
       
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Rider Emergency Contact:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {details?.rider_emergency_contact_name}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Rider Emergency Contact Number:{" "}
          <span style={{ paddingLeft: "10px" }}>
            {details?.rider_emergency_contact_phone_number}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Vehicle Registration Number:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {details?.vehicle_registration_number}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Vehicle Type:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {details?.vehicle_type}
          </span>
        </div>
       
      </div>
   
    </StyledContainer>
  );
};

export default MoreDetails;

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
