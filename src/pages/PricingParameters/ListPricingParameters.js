import React, { useEffect } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllPricingParameters } from "../../redux/pricingparameterSlice";
import PricingParametersTable from "./PricingParametersTable";

const ListPricingParameters = () => {
  const { pricing } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPricingParameters());
  }, []);

  console.log(pricing);

  const handleEdit = ({ id }) => {
 
  }

  return (
    <div>
      <PageHeader
        extra={[
          // <Button key="CreateHub">
          //   <CreatePricingParameters />
          // </Button>
        ]}
        title="Pricing Parameter"
      />
      <PricingParametersTable
        data={pricing?.data}
        loading={pricing.loading}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default ListPricingParameters;
