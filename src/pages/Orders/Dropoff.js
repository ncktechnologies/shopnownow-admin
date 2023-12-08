import moment from "moment";
import React from "react";
import styled from "styled-components";
import { RowDetails } from "../../components/RowDetails";
import BulkDropoff from "./BulkDropoff";

const Dropoff = ({ dropoff, bulkDropoff }) => {
  return (
    <StyledContainer>
      <div className="flex flex-col gap-10">
        <RowDetails label="First name" value={dropoff?.first_name || "Null"} />
        <RowDetails label="Last name" value={dropoff?.last_name || "Null"} />
        <RowDetails
          label="Phone Number"
          value={dropoff?.phone_number || "Null"}
        />
        <RowDetails label="Email address" value={dropoff?.email || "Null"} />
        <RowDetails
          label="Address"
          value={dropoff?.dropoff_address || "Null"}
        />
        <RowDetails label="Latitude" value={dropoff?.latitude || "Null"} />
        <RowDetails label="Longitude" value={dropoff?.longitude || "Null"} />
        <RowDetails label="City" value={dropoff?.city || "Null"} />
        <RowDetails label="Country" value={dropoff?.country || "Null"} />

        <RowDetails
          label="Postal code"
          value={dropoff?.postal_code || "Null"}
        />

        <RowDetails
          label="Date Created"
          value={moment(dropoff?.created_at).format("DD MMM YYYY")}
        />
      </div>
      {bulkDropoff && <BulkDropoff data={bulkDropoff} />}
    </StyledContainer>
  );
};

export default Dropoff;

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`;
