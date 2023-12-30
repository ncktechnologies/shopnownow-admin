import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getAllCategories } from "../../redux/categorySlice";
import { getAllBands } from "../../redux/bandSlice";
import { notification, Avatar } from "antd";

function CreateCategory() {
  const initialFormState = {
    name: "",
    tax: "",
    delivery_option: "",
    discount_option: "",
    discount_type: "",
    discount_value: "",
    thumbnail: "",
    band_id: "",
    order: ""
  };

  const [show, setShow] = useState(false);

  const { band } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllBands());
  }, []);

  const [categoryFormData, setcategoryFormData] = useState(initialFormState);
  const [image, setImage] = useState("");

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
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

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setcategoryFormData({
      ...categoryFormData,
      [name]: value,
    });
  };

  const handleDeliveryChange = (event) => {
    const selectedValue = event.target.value;
    setcategoryFormData({
      ...categoryFormData,
      delivery_option: selectedValue,
    });
  };

  const handleDiscountOption = (event) => {
    const selectedValue = event.target.value;
    setcategoryFormData({
      ...categoryFormData,
      discount_option: selectedValue,
    });
  };

  const handleDiscountType = (event) => {
    const selectedValue = event.target.value;
    setcategoryFormData({
      ...categoryFormData,
      discount_type: selectedValue,
    });
  };

  const handleBandChange = (event) => {
    const selectedValue = event.target.value;
    setcategoryFormData({
      ...categoryFormData,
      band_id: selectedValue,
    });
  };

  const clearFormData = () => {
    setcategoryFormData({
      name: "",
      tax: "",
      delivery_option: "",
      discount_option: "",
      discount_type: "",
      discount_value: "",
      thumbnail: "",
      band_id: "",
      order: ""
    });
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", categoryFormData.name);
    formData.append("tax", categoryFormData.tax);
    formData.append("delivery_option", categoryFormData.delivery_option);
    formData.append("discount_option", categoryFormData.discount_option);
    formData.append(
      "discount_type",
      categoryFormData.discount_type === "1" ? "fixed" : "percentage"
    );
    formData.append("discount_value", categoryFormData.discount_value);
    formData.append("thumbnail", image);
    formData.append("band_id", categoryFormData.band_id);
    formData.append("order", categoryFormData.order);


    setConfirmLoading(true);
    dispatch(createCategory(formData))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "category/create/fulfilled") {
          dispatch(getAllCategories());
          handleClose();
          clearFormData();
          console.log("response act", response);
          notification.success({
            message: "Category created successfully",
          });
        } else if (response.type === "category/create/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notificatom",
          "Error creating category, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Create category</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCategory}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter category name"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tax </Form.Label>
              <Form.Control
                type="text"
                name="tax"
                placeholder="Tax"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Delivery option</Form.Label>
              <Form.Select
                name="delivery_option" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleDeliveryChange}
                value={categoryFormData.delivery_option}
              >
                <option>Select delivery option</option>

                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Discount option</Form.Label>
              <Form.Select
                name="discount_option" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleDiscountOption}
                value={categoryFormData.discount_option}
              >
                <option>Select discount option</option>

                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Discount type</Form.Label>
              <Form.Select
                name="discount_option" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleDiscountType}
                value={categoryFormData.discount_type}
              >
                <option>Select discount option</option>

                <option value="1">Fixed</option>
                <option value="0">Percentage</option>
              </Form.Select>
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
                value={categoryFormData.band_id}
              >
                <option>Select band</option>
                {band_list}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Discount value </Form.Label>
              <Form.Control
                type="text"
                name="discount_value"
                placeholder="Discount value"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Order </Form.Label>
              <Form.Control
                type="text"
                name="order"
                placeholder="Order"
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="thumbnail"
                onChange={(evnt) => onChangeImage(evnt)}
              />
            </Form.Group>

            <Button
              style={{ marginTop: "10px", background: '#ff0303', border: 'none' }}
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

export default CreateCategory;
