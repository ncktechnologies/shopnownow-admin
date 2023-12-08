import moment from "moment";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, Card, Typography } from "antd";
import { useDispatch } from "react-redux";
import {
  blockRider,
  approveRiderDoc,
  declineRiderDoc,
} from "../../redux/riderSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notification } from "antd";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


const RiderInfo = ({ singleData }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [reason, setReason] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const clearFormData = () => {
    setReason('')
  };

  const handleBlock = (data) => {
    dispatch(blockRider(data)).then((response) => {
      console.log(response);
      if (response.type === "rider/blockRider/fulfilled") {
        notification.success({
          message:
            response?.payload?.is_blocked === true
              ? "rider blocked"
              : "rider unblocked",
        });
      } else if (response.type === "rider/blockRider/rejected") {
        notification.error({
          message: response?.payload?.message,
        });
      }
    });
  };
  const handleApprove = (data) => {
    dispatch(approveRiderDoc(data)).then((response) => {
      if (response.type === "rider/approveRiderDoc/fulfilled") {
        notification.success({
          message: "rider documents approved",
        });
      } else if (response.type === "rider/approveRiderDoc/rejected") {
        notification.error({
          message: response?.payload?.message,
        });
      }
    });
  };
  const handleDecline = (e) => {
    e.preventDefault();
    var formData = {
      reason_for_rejection: reason,
      rider_id: singleData?.id,
    };

    console.log(formData);

    setConfirmLoading(true);

    dispatch(declineRiderDoc(formData)).then((response) => {
      setConfirmLoading(false);

      if (response.type === "rider/declineRiderDoc/fulfilled") {
        handleClose();
        clearFormData();
        notification.success({
          message: "rider documents declined",
        });
      } else if (response.type === "rider/declineRiderDoc/rejected") {
        notification.error({
          message: response?.payload?.message,
        });
      }
    });
  };

  return (
    <StyledContainer>
      <div className="flex flex-col content">
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Email:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.email}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Phone Number:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.phone_number}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Accepting Pickups:{" "}
          <span style={{ paddingLeft: "10px" }}>
            {singleData?.rider_detail?.accepting_pickups === 1 ? "Yes" : "No"}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Earnings:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.rider_earnings}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Status:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.status}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Is Blocked:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.is_blocked === true ? "Yes" : "No"}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Assigned Orders Count:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.rider_orders?.length}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Address:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.address}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Latitude:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.latitude}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Longitude:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.longitude}
          </span>
        </div>
        <div style={{ paddingBottom: "10px", fontWeight: "bold" }}>
          Created At:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {moment(singleData?.created_at).format("DD MMM YYYY")}
          </span>
        </div>
        <div style={{ paddingBottom: "20px", fontWeight: "bold" }}>
          Documents Status:{" "}
          <span style={{ paddingLeft: "10px", fontWeight: "normal" }}>
            {singleData?.rider_documents === null
              ? "N/A"
              : singleData?.rider_documents?.status}
          </span>
        </div>
        <div>
          <Button
            style={{ marginRight: "5px" }}
            onClick={() => handleApprove(singleData?.id)}
          >
            Approve Documents
          </Button>

          <Button
            danger
            style={{ color: "#ff0303", marginRight: "5px" }}
            onClick={handleShow}
          >
            Decline Documents
          </Button>
          <Button danger onClick={() => handleBlock(singleData?.id)}>
            {singleData?.is_blocked === true ? "Unblock Rider" : "Block Rider"}
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Reason for rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>
                Reason for rejection <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="reason_for_rejection"
                placeholder="Enter reason"
                required
                value={reason}
                onChange={(e)=> setReason(e.target.value)}
              />
            </Form.Group>

            <Button onClick={handleDecline}
              variant="primary"
              type="submit"
              disabled={confirmLoading ? true : false}
            >
              {confirmLoading ? "Please wait..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </StyledContainer>
  );
};

export default RiderInfo;

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
