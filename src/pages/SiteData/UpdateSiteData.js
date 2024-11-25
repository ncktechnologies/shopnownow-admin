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
  faq: [
    {
      question: "",
      answer: "",
    },
  ],
  terms_and_conditions: "",
  privacy_policy: "",
  contact_data: "",
};

function UpdateSiteData({ sitedata }) {
  const [show, setShow] = useState(false);
  const [sitedataFormData, setsitedataFormData] = useState(initialFormState);
  const [faqArray, setfaqArray] = useState(initialFormState.faq);


  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const faqJson = sitedata?.data?.faq && JSON.parse(sitedata?.data?.faq);

  useEffect(() => {
    setsitedataFormData({
      faq: faqJson,
      terms_and_conditions: sitedata?.data?.terms_and_conditions,
      privacy_policy: sitedata?.data?.privacy_policy,
      contact_data: sitedata?.data?.contact_data,
    });
  
    setfaqArray(faqJson || initialFormState.faq);
  }, [sitedata]);
  


  
  


  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
  
    if (name === "question" || name === "answer") {
      const newFaq = [...faqArray];
      newFaq[index] = {
        ...newFaq[index],
        [name]: value,
      };
      setfaqArray(newFaq);
    } else {
      setsitedataFormData({
        ...sitedataFormData,
        [name]: value,
      });
    }
  };
  
  
  

  const addFormFields = () => {
    if (faqArray.length >= 10) {
      alert("You can't add more than 10 items");
      return;
    }
    setfaqArray([...faqArray, { question: "", answer: "" }]);
  };
  

  const removeFormFields = (index) => {
    if (faqArray.length > 1) {
      const newfaqArray = [...faqArray];
      newfaqArray.splice(index, 1);
      setfaqArray(newfaqArray);
    }
  };



  const clearFormData = () => {
    setsitedataFormData({
      faq: [
    {
      question: "",
      answer: "",
   },
  ],
      terms_and_conditions: "",
      privacy_policy: "",
      contact_data: "",
    });
  };

  const handleEditSiteData = (e) => {
    e.preventDefault();



      const data = {

        faq: faqArray.map((data)=> ({question: data.question, answer: data.answer })),

        terms_and_conditions: sitedataFormData.terms_and_conditions,
        privacy_policy: sitedataFormData.privacy_policy,
        contact_data: sitedataFormData.contact_data

    }
  

    setConfirmLoading(true);
    dispatch(editSiteData(data))
      .then((response) => {
        console.log(response)
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

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit Site data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSiteData}>
      
            <h6>
              <strong>Add FAQ</strong>
            </h6>

            {faqJson && faqArray?.map((data, index) => (
              <div className="form-inline" key={index}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    style={{ marginBottom: "10px" }}
                  >
                    <Form.Label style={{marginTop: '10px'}}>Question</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      name="question"
                      onChange={(evt) => handleInputChange(evt, index)}
                      defaultValue={data?.question}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    style={{ marginBottom: "10px" }}
                  >
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      name="answer"
                      onChange={(evt) => handleInputChange(evt, index)}
                      defaultValue={data?.answer}
                    />
                  </Form.Group>

                  {index ? (
                    <span
                      className="button remove"
                      onClick={() => removeFormFields(index)}
                      style={{ color: "red", cursor: "pointer",}}
                      title="Delete from list"
                    >
                      Remove
                    </span>
                  ) : null}
              </div>
            ))}

            <div className="button-section" style={{display: 'flex', justifyContent: 'flex-end'}}>
              <button
  style={{
    background: "#ff0303",
    color: "#fff",
    border: "none",
    padding: '5px 10px'
  }}                className="button add mb-3 float-centre"
                type="button"
                onClick={() => addFormFields()}
              >
                Add more FAQ Q/A
              </button>
            </div>

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
