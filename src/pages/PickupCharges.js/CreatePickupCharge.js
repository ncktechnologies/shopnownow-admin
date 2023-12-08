import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { createPickup, getAllPickup } from '../../redux/pickupchargeSlice'

const initialFormState = {
  from: '',
  to: '',
  price: ''
}

function CreatePickupCharge() {
  const [show, setShow] = useState(false)
  const [pickupFormData, setpickupFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState([])

  const handleClose = () => {
    setShow(false)
    setSelected([])
  }
  const handleShow = () => {
    setShow(true)
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setpickupFormData({
      ...pickupFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setpickupFormData({
      from: '',
      to: '',
      price: ''
    })
  }

  const handleCreateNotification = (e) => {
    e.preventDefault()

    const data = {
      from: pickupFormData.from,
      to: pickupFormData.to,
      price: pickupFormData.price,
    }

    setConfirmLoading(true)
    dispatch(createPickup(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'pickupcharge/create/fulfilled') {
          dispatch(getAllPickup())
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'pickupcharge created successfully',
          })
        } else if (response.type === 'pickupcharge/create/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error creating pickupcharge, please try again')
      })
  }


  return (
    <>
      <span onClick={handleShow}>Create pickup charge</span>

      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create pickup charge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateNotification}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Min (kg)</Form.Label>
              <Form.Control
                type='text'
                name='from'
                placeholder='Enter min value'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Max (kg)</Form.Label>
              <Form.Control
                type='text'
                name='to'
                placeholder='Enter max value'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                name='price'
                placeholder='Enter price'
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

export default CreatePickupCharge
