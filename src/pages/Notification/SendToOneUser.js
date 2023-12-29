import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { sendToOneUser } from "../../redux/notificationSlice";
import { getAllUsers } from "../../redux/userSlice";

const initialFormState = {
  title: "",
  body: "",
};

function SendToOneUser() {
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);


  const client_list =
    users &&
    users?.data?.users?.map((client, key) => {
      return (
        <option value={client?.id} key={key}>
          {client?.name}
        </option>
      );
    });

  const [show, setShow] = useState(false);
  const [notificationFormData, setnotificationFormData] =
    useState(initialFormState);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setnotificationFormData({
      ...notificationFormData,
      [name]: value,
    });
  };

  const handleClientChange = (event) => {
    const selectedValue = event.target.value;
    setnotificationFormData({
      ...notificationFormData,
      user_id: selectedValue,
    });
  };

  const clearFormData = () => {
    setnotificationFormData({
      title: "",
      body: "",
    });
  };

  const handleSendToAllUsers = (e) => {
    e.preventDefault();

    const data = {
      title: notificationFormData.title,
      body: notificationFormData.body,
      user_id: notificationFormData.user_id,
    };


    setConfirmLoading(true);
    dispatch(sendToOneUser(data))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "sendtoone/create/fulfilled") {
          handleClose();
          clearFormData();
          console.log("response act", response);
          notification.success({
            message: "notification created successfully",
          });
        } else if (response.type === "sendtoone/create/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error creating notification, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Send notification to one user </span>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Send notification to one user </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendToAllUsers}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter message title"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Message content </Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                placeholder="Message content"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Select user</Form.Label>
              <Form.Select
                name="user_id" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleClientChange}
                value={notificationFormData.user_id}
              >
                <option>Select user</option>
                {client_list}
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              style={{ color: "#fff", backgroundColor: "#ff0303", border: 'none' }}
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

export default SendToOneUser;
