import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { editSiteData, getAllSiteData } from "../../redux/siteDataSlice";
import { notification } from "antd";

const initialFormState = {
  faq: "",
  terms_and_conditions: "",
  privacy_policy: "",
  contact_data: "",
};

function UpdateSiteData({ sitedata }) {
  const [show, setShow] = useState(false);
  const [sitedataFormData, setsitedataFormData] = useState(initialFormState);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setsitedataFormData({
      ...sitedataFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    setsitedataFormData({
      faq: sitedata?.data?.faq,
      terms_and_conditions: sitedata?.data?.terms_and_conditions,
      privacy_policy: sitedata?.data?.privacy_policy,
      contact_data: sitedata?.data?.contact_data,
    });
  }, [sitedata]);

  const clearFormData = () => {
    setsitedataFormData({
      faq: "",
      terms_and_conditions: "",
      privacy_policy: "",
      contact_data: "",
    });
  };

  const handleEditSiteData = (e) => {
    e.preventDefault();

    const data = {
        faq: sitedataFormData?.faq,
        terms_and_conditions: sitedataFormData?.terms_and_conditions,
        privacy_policy: sitedataFormData?.privacy_policy,
        contact_data: sitedataFormData?.contact_data,
    }


    setConfirmLoading(true);
    dispatch(editSiteData(data))
      .then((response) => {
        setConfirmLoading(false);
        if (response.type === "siteData/edit/fulfilled") {
          dispatch(getAllSiteData());
          handleClose();
          notification.success({
            message: "sitedata updated successfully",
          });
        } else if (response.type === "siteData/edit/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
          console.log("Error notification", response?.payload?.message);
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.log(
          "Error notification",
          "Error updating sitedata, please try again"
        );
      });
  };

  return (
    <>
      <span onClick={handleShow}>Edit Site Data</span>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit Site data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSiteData}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>FAQ </Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                name="faq"
                onChange={(evt) => handleInputChange(evt)}
                defaultValue={sitedataFormData.faq}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Terms and conditions </Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                name="terms_and_conditions"
                onChange={(evt) => handleInputChange(evt)}
                defaultValue={sitedataFormData.terms_and_conditions}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Privacy policy </Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "200px" }}
                name="privacy_policy"
                onChange={(evt) => handleInputChange(evt)}
                defaultValue={sitedataFormData.privacy_policy}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Contact data </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="sitedata content here"
                style={{ height: "200px" }}
                name="contact_data"
                onChange={(evt) => handleInputChange(evt)}
                defaultValue={sitedataFormData.contact_data}
              />
            </Form.Group>
            <Button
              style={{
                background: "#ff0303",
                color: "#fff",
                border: "none",
              }}
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

export default UpdateSiteData;
