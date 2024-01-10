import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  editDeliveryLocation,
  getAllDeliveryLocations,
} from "../../redux/deliveryLocationSlice";
import { notification } from "antd";
import { getAllBands } from "../../redux/bandSlice";
import { getAllLocations } from "../../redux/locationSlice";

import { Switch } from "antd";

const initialFormState = {
  location: "",
  price: "",
  band_id: "",
  hidden: "",
};

function UpdateDeliveryLocation({ deliveryLocation }) {
  const [show, setShow] = useState(false);
  const [deliveryLocationFormData, setDeliveryLocationFormData] =
    useState(initialFormState);

  const { band, location } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllBands());
    dispatch(getAllLocations())

  }, []);

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
    location?.data?.map((location) => {
      return (
        <option value={location?.name} key={location?.id}>
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

  const [checked, setChecked] = useState(null);

  useEffect(() => {
    setDeliveryLocationFormData({
      location: deliveryLocation.location,
      price: deliveryLocation.price,
      band_id: deliveryLocation.band_id,
    });

    deliveryLocation.hidden === 0 ? setChecked(true) : setChecked(false);
  }, [deliveryLocation]);

  const clearFormData = () => {
    setDeliveryLocationFormData({
      location: "",
      price: "",
      band_id: "",
      hidden: "",
    });
  };

  const handleEditdeliveryLocation = (e) => {
    e.preventDefault();
    const data = {
      location: deliveryLocationFormData.location,
      hidden: checked === false ? "1" : "0",
      price: deliveryLocationFormData.price,
      band_id: deliveryLocationFormData.band_id,
      delivery_id: deliveryLocation.id
    };

    setConfirmLoading(true);
    dispatch(editDeliveryLocation(data))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "deliveryLocation/edit/fulfilled") {
          dispatch(getAllDeliveryLocations());
          handleClose();
          //   clearFormData()
          notification.success({
            message: "deliveryLocation updated successfully",
          });
        } else if (response.type === "deliveryLocation/edit/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
          console.log("error notification", response?.payload?.message);
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error updating deliveryLocation, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit delivery location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditdeliveryLocation}>
          <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Select location</Form.Label>
              <Form.Select
                name="location" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleLocationChange}
                defaultValue={deliveryLocationFormData.location}

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
                defaultValue={deliveryLocationFormData.price}
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
                defaultValue={deliveryLocationFormData.band_id}
              >
                <option>Select band</option>
                {band_list}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-4" controlId="exampleForm.ControlSelect1">
              <Form.Label>Show location</Form.Label>
              <Switch
                style={{ backgroundColor: "#ff0303", marginLeft: "10px" }}
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

export default UpdateDeliveryLocation;
