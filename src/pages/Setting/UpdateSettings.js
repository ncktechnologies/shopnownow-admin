import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { notification } from "antd";
import { getAllSettings, editSettings } from "../../redux/settingsSlice";


const initialFormState = {
  key: "",
  value: ""
};

function UpdateSettings({ settings }) {
  const [show, setShow] = useState(false);
  const [settingsFormData, setsettingsFormData] = useState(initialFormState);


  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setsettingsFormData({
      ...settingsFormData,
      [name]: value,
    });
  };


  useEffect(() => {
    setsettingsFormData({
      key: settings?.key,
      value: settings?.value
    });
  }, [settings]);

  const clearFormData = () => {
    setsettingsFormData({
      key: "",
      value: ""    });
  };

  const handleeditSettings = (e) => {
    e.preventDefault();

    var formData = new FormData();


    formData.append("key", settingsFormData.key);
    formData.append("value", settingsFormData.value);

    setConfirmLoading(true);
    dispatch(editSettings(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "settings/edit/fulfilled") {
          dispatch(getAllSettings());
          handleClose();
          clearFormData();
          notification.success({
            message: "settings updated successfully",
          });
        } else if (response.type === "settings/edit/rejected") {
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
          "Error updating settings, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleeditSettings}>

                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Key</Form.Label>
                    <Form.Control
                      type="text"
                      name="key"
                      defaultValue={settingsFormData?.key}
                      onChange={(evt) => handleInputChange(evt)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                      type="text"
                      name="value"
                      defaultValue={settingsFormData?.value}
                      onChange={(evt) => handleInputChange(evt)}
                    />
                  </Form.Group>
  

            <Button style={{background: '#ff0303', border: '1px solid #ff0303'}}
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

export default UpdateSettings;
