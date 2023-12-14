import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { editTimeSlot, getAllTimeSlots } from "../../redux/timeSlotSlice";
import { notification, Avatar } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col } from "react-bootstrap";

const initialFormState = {
  start_time: "",
  end_time: "",
  is_available: "",
  

};

function UpdateTimeSlot({timeslot}) {

  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const [show, setShow] = useState(false);

  const [timeSlotFormData, setTimeSlotFormData] = useState(initialFormState);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const clearFormData = () => {
    setTimeSlotFormData({
      start_time: "",
      end_time: "",
      is_available: "",
    });
  };


  useEffect(() => {
    setTimeSlotFormData({
      type: timeslot.is_available === "yes" ? "1" : "0",
      start_date: timeslot.start_date,
      end_date: timeslot.end_date,
   
    })
  }, [timeslot])

  const handleEditTimeSlot = (e) => {

 

    e.preventDefault();
    const formData = {
      start_time:  selectedStartTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      end_time:selectedEndTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      is_available: timeSlotFormData.is_available,
      timeslot_id: timeslot.id
 
    };

    setConfirmLoading(true);
    dispatch(editTimeSlot(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "timeslot/edit/fulfilled") {
          dispatch(getAllTimeSlots());
          handleClose();
          clearFormData();
          notification.success({
            message: "timeslot updated successfully",
          });
        } else if (response.type === "timeslot/edit/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error updating time slot, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit Time slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditTimeSlot}>
            
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select start time</Form.Label>
                  <Col sm="10">
                    <DatePicker
                      selected={selectedStartTime}
                      onChange={handleStartTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm"
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select end time</Form.Label>
                  <Col sm="10">
                    <DatePicker
                      selected={selectedEndTime}
                      onChange={handleEndTimeChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm"
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
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
                defaultValue={timeslot?.is_available}

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

export default UpdateTimeSlot;
