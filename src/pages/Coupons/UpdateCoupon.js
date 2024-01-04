import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { editCoupon, getAllCoupons } from '../../redux/couponSlice'
import { notification } from 'antd'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col } from "react-bootstrap";

const initialFormState = {
  code: "",
  type: "",
  value: "",
  start_date: "",
  end_date: "",
}

function UpdateCoupon({ coupon }) {
  const [show, setShow] = useState(false)
  const [couponFormData, setCouponFormData] = useState(initialFormState)
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };


  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setCouponFormData({
      ...couponFormData,
      [name]: value,
    })
  }


  useEffect(() => {
    setCouponFormData({
      code: coupon.code,
      type: coupon.type === "percentage" ? "1" : "0",
      value: coupon.value,
      start_date: coupon.start_date,
      end_date: coupon.end_date,
   
    })
  }, [coupon])

  const clearFormData = () => {
    setCouponFormData({
      code: "",
      type: "",
      value: "",
      start_date: "",
      end_date: "",
    });
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Africa/Lagos', // West Africa Time (GMT+1)
    };
  
    const formattedDate = date.toLocaleString('en-NG', options).replace(/\//g, '-');
    const [day, month, year] = formattedDate.split('-');
    return `${year}-${month}-${day}`;
  };

  const handleEditCoupon = (e) => {
    e.preventDefault()
    const data = {
      code: couponFormData.code,
      type: couponFormData.type === "1" ? "percentage" : "amount",
      value: couponFormData.value,
      start_date: formatDate(selectedStartDate),
      end_date: formatDate(selectedEndDate),
      coupon_id: coupon?.id
    };


    setConfirmLoading(true)
    dispatch(editCoupon(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'coupon/edit/fulfilled') {
          dispatch(getAllCoupons())
          handleClose()
          //   clearFormData()
          notification.success({
            message: 'coupon updated successfully',
          })
        } else if (response.type === 'coupon/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notification', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error updating coupon, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleEditCoupon}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                placeholder="Enter code"
                defaultValue={couponFormData?.code}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Value </Form.Label>
              <Form.Control
                type="text"
                name="value"
                placeholder="Enter value"
                defaultValue={couponFormData?.value}

                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Type </Form.Label>
              <Form.Select
                name="type"
                onChange={(evt) =>
                  setCouponFormData({
                    ...couponFormData,
                    type: evt.target.value,
                  })
                }
                aria-label="Default select example"
                value={couponFormData.type}
              >
                <option>Select type</option>

                <option value="1">Percentage</option>
                <option value="0">Amount</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select start date</Form.Label>
                  <Col sm="10">
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={handleStartDateChange}
                      dateFormat="yyyy/MM/dd"
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select end date</Form.Label>
                  <Col sm="10">
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={handleEndDateChange}
                      dateFormat="yyyy/MM/dd"
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

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
  )
}

export default UpdateCoupon
