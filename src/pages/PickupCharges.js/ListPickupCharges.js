import React, { useEffect } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deletePickup, getAllPickup } from "../../redux/pickupchargeSlice";
import CreatePickupCharge from "./CreatePickupCharge";
import PickupChargeTable from "./PickupChargeTable";

const ListPickupCharges = () => {
  const { pickup } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPickup());
  }, []);

  console.log(pickup);


  const handleDelete = ({ id }) => {
    if (
      !window.confirm(
        "Do You want to permanently delete the selected pickup charge?"
      )
    ) {
      return;
    }

    dispatch(deletePickup(id))
      .then((response) => {
        if (response.type === "pickupcharge/delete/fulfilled") {
          dispatch(getAllPickup());
          notification.success({
            message: " charge deleted successfully",
          });
        } else if (response.type === "pickupcharge/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting charge, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting charge, please try again later",
        });
      });
  };

  return (
    <div>
      <PageHeader
        extra={[
          <Button key="CreateAdmin">
            <CreatePickupCharge />
          </Button>,
        ]}
        title="Pickup Charges"
      />
      <PickupChargeTable
        data={pickup?.data}
        loading={pickup.loading}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ListPickupCharges;
