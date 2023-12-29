import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createAdmin, getAllAdmin } from "../../redux/adminSlice";
import { notification } from "antd";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function Createadmin() {
  const [show, setShow] = useState(false);
  const [adminFormData, setadminFormData] = useState(initialFormState);

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setadminFormData({
      ...adminFormData,
      [name]: value,
    });

    if (name === "password_confirmation") {
      // Compare with the password field
      setPasswordsMatch(value === adminFormData.password);
    }
  
    setadminFormData({
      ...adminFormData,
      [name]: value,
    });
  };


 


  const clearFormData = () => {
    setadminFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  const handlecreateadmin = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", adminFormData.name);
    formData.append("email", adminFormData.email);
    formData.append("password", adminFormData.password);

    setConfirmLoading(true);
    dispatch(createAdmin(formData))
      .then((response) => {
        setConfirmLoading(false);

        if (response.type === "admin/create/fulfilled") {
          dispatch(getAllAdmin());
          handleClose();
          clearFormData();
          notification.success({
            message: "admin created successfully",
          });
        } else if (response.type === "admin/create/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error creating admin, please try again",
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error creating admin, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create admin</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlecreateadmin}>
            <Form.Group
              className="mb-3"
              controlId="formBasicFN"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter first name"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
      

            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter email"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

    

            <Form.Group
              controlId="formPassword"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={adminFormData.password}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
  <Form.Label>Confirm Password</Form.Label>
  <Form.Control
    type="password"
    placeholder="Confirm password"
    name="password_confirmation"
    value={adminFormData.password_confirmation}
    onChange={(evt) => handleInputChange(evt)}
  />
  {!passwordsMatch && (
    <div style={{ color: "red" }}>Passwords do not match</div>
  )}
</Form.Group>

            <Button
              style={{ marginTop: '10px', color: "#fff", backgroundColor: "#ff0303", border: 'none' }}
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

export default Createadmin;