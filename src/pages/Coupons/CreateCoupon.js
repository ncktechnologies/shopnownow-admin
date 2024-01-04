import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createCoupon, getAllCoupons } from "../../redux/couponSlice";
import { notification, Avatar } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col } from "react-bootstrap";

function CreateCoupon() {
  const initialFormState = {
    code: "",
    type: "",
    value: "",
    start_date: "",
    end_date: "",
  };

  const [show, setShow] = useState(false);

  const [couponFormData, setCouponFormData] = useState(initialFormState);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCouponFormData({
      ...couponFormData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setCouponFormData({
      code: "",
      type: "",
      value: "",
      start_date: "",
      end_date: "",
    });
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Africa/Lagos', // West Africa Time (GMT+1)
      };
    
      const formattedDate = date.toLocaleString('en-NG', options).replace(/\//g, '-');
      const [day, month, year] = formattedDate.split('-');
      return `${year}-${month}-${day}`;
    };
    
    
    
    
    
  

    const formData = {
      code: couponFormData.code,
      type: couponFormData.type === "1" ? "percentage" : "amount",
      value: couponFormData.value,
      start_date: formatDate(selectedStartDate),
      end_date: formatDate(selectedEndDate),
    };

    setConfirmLoading(true);
    dispatch(createCoupon(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "coupon/create/fulfilled") {
          dispatch(getAllCoupons());
          handleClose();
          clearFormData();
          console.log("response act", response);
          notification.success({
            message: "coupon created successfully",
          });
        } else if (response.type === "coupon/create/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error creating coupon, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create coupon</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCoupon}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                placeholder="Enter code"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Value </Form.Label>
              <Form.Control
                type="text"
                name="value"
                placeholder="Enter value"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Type </Form.Label>
              <Form.Select
                name="type"
                onChange={(evt) =>
                  setCouponFormData({
                    ...couponFormData,
                    type: evt.target.value,
                  })
                }
                aria-label="Default select example"
                value={couponFormData.type}
              >
                <option>Select type</option>

                <option value="1">Percentage</option>
                <option value="0">Amount</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select start date</Form.Label>
                  <Col sm="10">
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={handleStartDateChange}
                      dateFormat="yyyy/MM/dd"
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select end date</Form.Label>
                  <Col sm="10">
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={handleEndDateChange}
                      dateFormat="yyyy/MM/dd"
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Button
              style={{
                marginTop: "10px",
                background: "#ff0303",
                color: "#fff",
                border: "none",
              }}
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
    </>
  );
}

export default CreateCoupon;
