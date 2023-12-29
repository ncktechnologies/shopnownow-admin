import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { sendToMultipleUsers } from "../../redux/notificationSlice";
import { getAllUsers } from "../../redux/userSlice";

const initialFormState = {
  title: "",
  body: "",
  user_ids: "",
};

function SendToMultipleUsers() {
  const [show, setShow] = useState(false);
  const [notificationFormData, setnotificationFormData] =
    useState(initialFormState);
  const { users } = useSelector((state) => state);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const handleClose = () => {
    setShow(false);
    setSelected([]);
  };
  const handleShow = () => {
    setShow(true);
    dispatch(getAllUsers);
  };

  useEffect(() => {
    dispatch(getAllUsers);
    console.log("users", users);
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setnotificationFormData({
      ...notificationFormData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setnotificationFormData({
      title: "",
      body: "",
      user_ids: [],
    });
  };

  const handleChange = (e, i) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value]);
    } else {
      setSelected([...selected.filter((val) => val !== e.target.value)]);
    }
  };

  const handleSendToMultipleUsers = (e) => {
    e.preventDefault();

    const data = {
      title: notificationFormData.title,
      body: notificationFormData.body,
      user_ids: selected,
    };
    if (selected.length < 1) {
      notification.error({
        message: "No user selected. Please select at least one user",
      });
      return;
    }
    setConfirmLoading(true);
    dispatch(sendToMultipleUsers(data))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "sendtomultiple/create/fulfilled") {
          handleClose();
          clearFormData();
          notification.success({
            message: "notification created successfully",
          });
        } else if (response.type === "sendtomultiple/create/rejected") {
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

  const user_list =
    users &&
    users?.data?.users?.map((client, key) => {
      return (
        <label key={key} style={{ paddingBottom: "10px" }}>
          {client?.name}
          <input
            style={{ marginRight: "10px" }}
            type="checkbox"
            defaultValue={client.id}
            name="user_ids"
            onClick={(e) => handleChange(e, client.id)}
          />
          &nbsp;
        </label>
      );
    });

  return (
    <>
      <span onClick={handleShow}>Send to multiple users</span>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Send Notifications to multiple user(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendToMultipleUsers}>
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <h3>Select user(s)</h3>
              {user_list}
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

export default SendToMultipleUsers;
