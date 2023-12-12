import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { createSettings, getAllSettings } from "../../redux/settingsSlice";


const CreateSetting = () => {
  const initialFormState = {
    key: "",
    value: ""
  };


  const [show, setShow] = useState(false);
  const [settingsFormData, setsettingsFormData] = useState(initialFormState);
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
    setsettingsFormData({
      key: "",
      value: ""
    });

  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setsettingsFormData({
      ...settingsFormData,
      [name]: value,
    });
  };


  const handleCreatesettings = (e) => {
    e.preventDefault();


    var formData = new FormData();
    formData.append("key", settingsFormData.key);
    formData.append("value", settingsFormData.value);

    setConfirmLoading(true);

    dispatch(createSettings(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "settings/create/fulfilled") {
          dispatch(getAllSettings());
          handleClose();
          resetForm();
          notification.success({
            message: "settings created successfully",
          });
        } else if (response.type === "settings/create/rejected") {
          notification.error({
            message: "Error creating settings",
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
      <span onClick={handleShow}>Create settings</span>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton onClick={resetForm}>
          <Modal.Title>Create settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreatesettings}>
              
          <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Key</Form.Label>
                    <Form.Control
                      type="text"
                      name="key"
                      placeholder="Enter key"
                      onChange={(evt) => handleInputChange(evt)}
                    />
                  </Form.Group>
 
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                      type="text"
                      name="value"
                      placeholder="Enter value"
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

export default CreateSetting;
