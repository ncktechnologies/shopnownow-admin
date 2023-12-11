import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpecialRequests, deleteSpecialRequest } from "../../redux/specialRequestSlice";
import SpecialRequestTable from "./SpecialRequestTable";

const ListSpecialRequests = () => {
  const { special_requests } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpecialRequests());
  }, []);

  const handledeleteSpecialRequest = ({ id }) => {

    if (
      !window.confirm("Do You want to permanently delete the selected special request?")
    ) {
      return;
    }

    dispatch(deleteSpecialRequest(id))
      .then((response) => {
        if (response.type === "specialRequest/delete/fulfilled") {
          dispatch(getAllSpecialRequests());
          notification.success({
            message: " special request deleted successfully",
          });
        } else if (response.type === "specialRequest/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting special request, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting special request, please try again later",
        });
      });
  };

  return (
    <div>
      <PageHeader extra={[]} title="Special requests" />
      {special_requests?.data?.requests && (
        <SpecialRequestTable data={special_requests?.data?.requests} loading={special_requests.loading} handleDelete={handledeleteSpecialRequest} />
      )}
    </div>
  );
};

export default ListSpecialRequests;
