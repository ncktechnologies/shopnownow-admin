import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { useEffect } from 'react'
import { notification } from 'antd'
import {getAllPickup, editPickup} from '../../redux/pickupchargeSlice'

const initialFormState = {
  from: '',
  to: '',
  price: ''
}

function UpdatePickupCharge({ pickup }) {
  const [show, setShow] = useState(false)
  const [pickupFormData, setpickupFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setpickupFormData({
      ...pickupFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    setpickupFormData({
      from: pickup?.from || '',
      to: pickup?.to || '',
      price: pickup?.price || '',

    });

  }, [pickup]);
  
  const clearFormData = () => {
    setpickupFormData({
      from: '',
      to: '',
      price: ''
    })
  }

  const handleEditpickup = (e) => {
    e.preventDefault()
    const data = {
      from: pickupFormData?.from,
      to: pickupFormData?.to,
      price: pickupFormData?.price,
      pickup_charge_id: pickup?.id,
    };


    setConfirmLoading(true)
    dispatch(editPickup(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'pickupcharge/edit/fulfilled') {
          dispatch(getAllPickup())
          handleClose()
            clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'pickup updated successfully',
          })
        } else if (response.type === 'pickupcharge/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notification', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error updating pickup, please try again', error)
      })
  }

  return (
    <>
      <span onClick={handleShow}>edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit pickup charge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditpickup}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Min (kg)</Form.Label>
              <Form.Control
                type='text'
                name='from'
                defaultValue={pickupFormData.from}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Max (kg)</Form.Label>
              <Form.Control
                type='text'
                name='to'
                defaultValue={pickupFormData.to}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                name='price'
                defaultValue={pickupFormData.price}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default UpdatePickupCharge
