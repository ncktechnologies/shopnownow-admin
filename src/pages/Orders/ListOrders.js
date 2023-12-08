import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders, deleteOrder } from "../../redux/orderSlice";
import OrderTable from "./OrderTable";

const ListOrders = () => {
  const { orders } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const handleDeleteOrder = ({ id }) => {

    if (
      !window.confirm("Do You want to permanently delete the selected order?")
    ) {
      return;
    }

    dispatch(deleteOrder(id))
      .then((response) => {
        if (response.type === "order/delete/fulfilled") {
          dispatch(getAllOrders());
          notification.success({
            message: " order deleted successfully",
          });
        } else if (response.type === "order/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting order, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting service category, please try again later",
        });
      });
  };

  return (
    <div>
      <PageHeader extra={[]} title="Orders" />
      {orders?.data && (
        <OrderTable data={orders?.data?.orders} loading={orders.loading} handleDelete={handleDeleteOrder} />
      )}
    </div>
  );
};

export default ListOrders;
