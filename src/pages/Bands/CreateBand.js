import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createBand, getAllBands } from "../../redux/bandSlice";
import { notification, Avatar } from "antd";

function CreateBand() {
  const initialFormState = {
    name: "",
    description: "",
    minimum: "",
    discount_enabled: "",
    bulk_discount_amount: "",
    bulk_discount_percentage: "",
    general_discount: "",
  };

  const [show, setShow] = useState(false);

  const [bandFormData, setbandFormData] = useState(initialFormState);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setbandFormData({
      ...bandFormData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setbandFormData({
      name: "",
      description: "",
      minimum: "",
      discount_enabled: "",
      bulk_discount_amount: "",
      bulk_discount_percentage: "",
      general_discount: "",
    });
  };

  const handleCreateBand = (e) => {
    e.preventDefault();
    const formData = {
      name: bandFormData.name,
      description: bandFormData.description,
      minimum: bandFormData.minimum,
      discount_enabled: bandFormData.discount_enabled,
      bulk_discount_amount: bandFormData.bulk_discount_amount,
      bulk_discount_percentage: bandFormData.bulk_discount_percentage,
      general_discount: bandFormData.general_discount,
    };

    setConfirmLoading(true);
    dispatch(createBand(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "band/create/fulfilled") {
          dispatch(getAllBands());
          handleClose();
          clearFormData();
          console.log("response act", response);
          notification.success({
            message: "Band created successfully",
          });
        } else if (response.type === "band/create/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notificatom",
          "Error creating band, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create band</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create band</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateBand}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter band name"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>description </Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Minimum </Form.Label>
              <Form.Control
                type="text"
                name="minimum"
                placeholder="Minimum"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Bulk discount amount </Form.Label>
              <Form.Control
                type="text"
                name="bulk_discount_amount"
                placeholder="Bulk discount amount"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Bulk discount percentage </Form.Label>
              <Form.Control
                type="text"
                name="bulk_discount_percentage"
                placeholder="Bulk discount percentage"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> General discount </Form.Label>
              <Form.Control
                type="text"
                name="general_discount"
                placeholder="General discount"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Discount enabled </Form.Label>
              <Form.Select
                name="discount_enabled"
                onChange={(evt) =>
                  setbandFormData({
                    ...bandFormData,
                    discount_enabled: evt.target.value,
                  })
                }
                aria-label="Default select example"
                value={bandFormData.discount_enabled}
              >
                <option>Select option to enable discount</option>

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

export default CreateBand;
