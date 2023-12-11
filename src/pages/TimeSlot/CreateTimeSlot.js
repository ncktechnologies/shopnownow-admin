import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createTimeSlot, getAllTimeSlots } from "../../redux/timeSlotSlice";
import { notification, Avatar } from "antd";

function CreateTimeSlot() {
  const initialFormState = {
    delivery_time: "",
    is_available: "",
 
  };

  const [show, setShow] = useState(false);

  const [timeSlotFormData, setTimeSlotFormData] = useState(initialFormState);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setTimeSlotFormData({
      ...timeSlotFormData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setTimeSlotFormData({
      delivery_time: "",
      is_available: "",
    });
  };

  const handlecreateTimeSlot = (e) => {
    e.preventDefault();
    const formData = {
      delivery_time: timeSlotFormData.delivery_time,
      is_available: timeSlotFormData.is_available,
 
    };

    setConfirmLoading(true);
    dispatch(createTimeSlot(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "timeSlot/create/fulfilled") {
          dispatch(getAllTimeSlots());
          handleClose();
          clearFormData();
          notification.success({
            message: "timeSlot created successfully",
          });
        } else if (response.type === "timeSlot/create/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error creating time slot, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create Time slot</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create Time slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlecreateTimeSlot}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Delivery time</Form.Label>
              <Form.Control
                type="text"
                name="delivery_time"
                placeholder='Enter delivery time (e.g "10:00AM")'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Available </Form.Label>
              <Form.Select
                name="discount_enabled"
                onChange={(evt) =>
                  setTimeSlotFormData({
                    ...timeSlotFormData,
                    is_available: evt.target.value,
                  })
                }
                aria-label="Default select example"
                value={timeSlotFormData.discount_enabled}
              >
                <option>Select option to set availability</option>

                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
            </Form.Group>

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

export default CreateTimeSlot;
