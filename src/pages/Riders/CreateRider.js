import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createRider, getAllRiders } from "../../redux/riderSlice";
import { notification } from "antd";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import './rider.css'

import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const initialFormState = {
  name: "",
  phone_number: "",
  password: "",
  email: "",
  address: "",
  banner: "",
};

function CreateRider() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [riderFormData, setriderFormData] = useState(initialFormState);

  const apiKey = "AIzaSyB_fdcrsqDc2198oVz6Flm8l1SGu-8T5fw";

  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handlePlacesLoad = (searchBox) => {
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length > 0) {
        const place = places[0];
         setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
        setAddress(place.formatted_address);
      }
    });
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setriderFormData({
      ...riderFormData,
      [name]: value,
    });
  };
  useEffect(() => {}, []);
  const clearFormData = () => {
    setriderFormData({
      name: "",
      phone_number: "",
      password: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
      banner: "",
    });
    setImage("");
  };

  const handleCreateRider = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", riderFormData.name);
    formData.append("banner", image);
    formData.append("phone_number", riderFormData.phone_number);
    formData.append("password", riderFormData.password);
    formData.append("email", riderFormData.email);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("address", address);



    setConfirmLoading(true);
    dispatch(createRider(formData))
      .then((response) => {
        console.log(response);
        setConfirmLoading(false);
        if (response.type === "rider/createRider/fulfilled") {
          dispatch(getAllRiders());
          handleClose();
          clearFormData();
          notification.success({
            message: "rider created successfully",
          });
        } else if (response.type === "rider/createRider/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error creating rider, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create Rider</span>

      <Modal show={show} onHide={handleClose} size="md" backdrop="static">
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create Rider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateRider}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>
                    Full Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter rider name"
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Email<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicNumber">
                  <Form.Label>
                    Phone Number<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    placeholder="Enter rider phone number"
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    Password<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(evnt) => onChangeImage(evnt)}
                required
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              A picture is required.
            </Form.Control.Feedback>

            <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
              <StandaloneSearchBox onLoad={handlePlacesLoad}>
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    marginBottom: "15px",
                  }}
                >
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>
                      Rider address<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Search Places..."
                      required
                    />
                  </Form.Group>
                </div>
              </StandaloneSearchBox>
            </LoadScript>

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

export default CreateRider;


