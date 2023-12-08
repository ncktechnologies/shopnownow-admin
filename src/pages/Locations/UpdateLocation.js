import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Messages from "../../ToastMessages/Messages";
import { useEffect } from "react";
import { notification } from "antd";
import { getAllLocations, editLocation } from "../../redux/locationSlice";

import "./location.css";

const initialFormState = {
  name: "",
};

function UpdateHubLocation({ location }) {
  const [show, setShow] = useState(false);
  const [locationFormData, setlocationFormData] = useState(initialFormState);


  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setlocationFormData({
      ...locationFormData,
      [name]: value,
    });
  };


  useEffect(() => {
    setlocationFormData({
      name: location?.name || "",
    });
  }, [location?.name]);

  const clearFormData = () => {
    setlocationFormData({
      name: "",
    });
  };

  const handleEditlocation = (e) => {
    e.preventDefault();

    var formData = new FormData();


    formData.append("name", locationFormData.name);

    setConfirmLoading(true);
    dispatch(editLocation(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "location/edit/fulfilled") {
          dispatch(getAllLocations());
          handleClose();
          clearFormData();
          notification.success({
            message: "location updated successfully",
          });
        } else if (response.type === "location/edit/rejected") {
          notification.error({
            message: response?.error?.message,
          });
          console.log("error notification", response?.error?.message);
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error updating location, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditlocation}>

                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      defaultValue={locationFormData?.name}
                      onChange={(evt) => handleInputChange(evt)}
                    />
                  </Form.Group>
  

            <Button
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

export default UpdateHubLocation;
