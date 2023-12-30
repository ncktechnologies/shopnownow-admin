import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getAllProducts } from "../../redux/productSlice";
import { getAllCategories } from "../../redux/categorySlice";
import { notification } from "antd";


const initialFormState = {
  name: "",
  category_id: "",
  price: "",
  thumbnail: "",
  unit_of_measurement: ""
};

function EditProduct({data}) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [productFormData, setProductFormData] = useState(initialFormState);

  const { categories } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])
  
  const categories_list =
  categories?.data &&
  categories?.data?.map((category, key) => {
    return (
      <option value={category?.id} key={key}>
        {category?.name}
      </option>
    );
  });

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };



 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductFormData({
      ...productFormData,
      [name]: value,
    });
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setProductFormData({
      ...productFormData,
      category_id: selectedValue,
    });
  };

  const clearFormData = () => {
    setProductFormData({
      name: "",
      category_id: "",
      price: "",
      thumbnail: "",
      unit_of_measurement: ""
    });
    setImage("");
  };

  const handlecreateproduct = (e) => {
    e.preventDefault();

    var formData = new FormData()

    formData.append("category_id", productFormData.category_id);
    formData.append("name", productFormData.name);
    formData.append("price", productFormData.price);
    formData.append("unit_of_measurement", productFormData.unit_of_measurement);
    formData.append("thumbnail", image);
    formData.append("product_id", data.id);

    
    

    setConfirmLoading(true);
    dispatch(editProduct(formData))
      .then((response) => {
        setConfirmLoading(false);

        if (response.type === "product/edit/fulfilled") {
          dispatch(getAllProducts());
          handleClose();
          clearFormData();
          notification.success({
            message: "product updated successfully",
          });
        } else if (response.type === "product/edit/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error updating product, please try again",
          });
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "error notification",
          "Error updating product, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlecreateproduct}>
            <Form.Group
              className="mb-3"
              controlId="formBasicText"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name"
                defaultValue={data?.name}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            {categories?.data && (<Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Select category</Form.Label>
              <Form.Select
                name="category_id" // Add the "name" attribute
                aria-label="Default select example"
                required
                onChange={handleCategoryChange}
                value={productFormData.category_id}
                defaultValue={data?.category_id}

              >
               <option>Select category</option>
                    {categories_list}
              </Form.Select>
            </Form.Group>)}

            <Form.Group
              className="mb-3"
              controlId="formBasicText"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Enter price"
                onChange={(evt) => handleInputChange(evt)}
                defaultValue={data?.price}

              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicText"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Unit of Measurement</Form.Label>
              <Form.Control
                type="text"
                name="unit_of_measurement"
                placeholder="Enter product unit of measurement"
                onChange={(evt) => handleInputChange(evt)}
                defaultValue={data?.unit_of_measurement}

              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>image</Form.Label>
              <Form.Control
                type="file"
                name="thumbnail"
                onChange={(evnt) => onChangeImage(evnt)}

              />
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

export default EditProduct;