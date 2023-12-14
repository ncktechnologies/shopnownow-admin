import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createDeliveryLocation, getAllDeliveryLocations } from "../../redux/deliveryLocationSlice";
import { notification, Avatar } from "antd";
import { getAllBands } from "../../redux/bandSlice";
import { getAllLocations } from "../../redux/locationSlice";

import { Switch } from 'antd'


function CreateDeliveryLocation() {
  const initialFormState = {
    location: "",
    price: "",
    band_id: "",
    hidden: "",
  };

  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  const { band, location } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllBands());
  }, []);

  const [deliveryLocationFormData, setDeliveryLocationFormData] = useState(initialFormState);


  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setDeliveryLocationFormData({
      ...deliveryLocationFormData,
      [name]: value,
    });
  };

  const band_list =
  band &&
  band?.data?.map((band, key) => {
    return (
      <option value={band?.id} key={key}>
        {band?.name}
      </option>
    );
  });

  const location_list =
  location &&
  location?.data?.map((location, key) => {
    return (
      <option value={location?.name} key={key}>
        {location?.name}
      </option>
    );
  });

  const handleBandChange = (event) => {
    const selectedValue = event.target.value;
    setDeliveryLocationFormData({
      ...deliveryLocationFormData,
      band_id: selectedValue,
    });
  };

  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    setDeliveryLocationFormData({
      ...deliveryLocationFormData,
      location: selectedValue,
    });
  };


  const clearFormData = () => {
    setDeliveryLocationFormData({
      location: "",
      price: "",
      band_id: "",
      hidden: "",
    });
  };

  const handleCreatedeliveryLocation = (e) => {
    e.preventDefault();

 

    const formData = {
      location: deliveryLocationFormData.location,
      hidden: checked === false ? "1" : "0",
      price: deliveryLocationFormData.price,
     band_id: deliveryLocationFormData.band_id
    };

    setConfirmLoading(true);
    dispatch(createDeliveryLocation(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "deliveryLocation/create/fulfilled") {
          dispatch(getAllDeliveryLocations());
          handleClose();
          clearFormData();
          console.log("response act", response);
          notification.success({
            message: "deliveryLocation created successfully",
          });
        } else if (response.type === "deliveryLocation/create/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error creating delivery location, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create delivery location</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create delivery location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreatedeliveryLocation}>
          <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Select location</Form.Label>
              <Form.Select
                name="band_id" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleLocationChange}
                value={deliveryLocationFormData.location}
              >
                <option>Select location</option>
                {location_list}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price </Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Enter price"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Select band</Form.Label>
              <Form.Select
                name="band_id" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleBandChange}
                value={deliveryLocationFormData.band_id}
              >
                <option>Select band</option>
                {band_list}
              </Form.Select>
            </Form.Group>

            <Form.Group  className="mt-4" controlId="exampleForm.ControlSelect1"
            >
            <Form.Label>Show location</Form.Label>
            <Switch style={{backgroundColor: '#ff0303', marginLeft: '10px'}}
            
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
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

export default CreateDeliveryLocation;
