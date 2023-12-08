import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { createLocation, getAllLocations } from "../../redux/locationSlice";

import "./location.css";

const CreateLocation = () => {
  const initialFormState = {
    name: "",
  };


  const [show, setShow] = useState(false);
  const [locationFormData, setlocationFormData] = useState(initialFormState);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => {
    setShow(true);
  };


  const resetForm = () => {
    setlocationFormData({
      name: ""
    });

  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setlocationFormData({
      ...locationFormData,
      [name]: value,
    });
  };


  const handleCreateLocation = (e) => {
    e.preventDefault();


    var formData = new FormData();
    formData.append("name", locationFormData.name);

    setConfirmLoading(true);

    dispatch(createLocation(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "location/create/fulfilled") {
          dispatch(getAllLocations());
          handleClose();
          resetForm();
          notification.success({
            message: "location created successfully",
          });
        } else if (response.type === "location/create/rejected") {
          notification.error({
            message: "Error creating location",
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create Location</span>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton onClick={resetForm}>
          <Modal.Title>Create location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateLocation}>
              
          <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      defaultValue={locationFormData?.name}
                      onChange={(evt) => handleInputChange(evt)}
                    />
                  </Form.Group>
 

            <Button variant="primary" type="submit" disabled={confirmLoading} style={{background: '#ff0303', border: '1px solid #ff0303'}}>
              {confirmLoading ? "Please wait..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CreateLocation;
