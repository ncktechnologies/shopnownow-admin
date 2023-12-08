import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { createPushNotification, getAllNotifications } from '../../redux/notificationSlice'

const initialFormState = {
  message_title: '',
  message_content: '',
  user_type: '',
}

function CreatePushNotification() {
  const [show, setShow] = useState(false)
  const [notificationFormData, setnotificationFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }


  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setnotificationFormData({
      ...notificationFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setnotificationFormData({
      message_title: '',
      message_content: '',
      user_type: ''
    })
  }

  const handlecreatePushNotification = (e) => {
    e.preventDefault()

    const data = {
      message_title: notificationFormData.message_title,
      message_content: notificationFormData.message_content,
      user_type: notificationFormData.user_type,
      
    }

    console.log(data)

    setConfirmLoading(true)
    dispatch(createPushNotification(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'pushnotification/create/fulfilled') {
          dispatch(getAllNotifications())
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'push notification created successfully',
          })
        } else if (response.type === 'pushnotification/create/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error creating notification, please try again')
      })
  }



  return (
    <>
      <span onClick={handleShow}>Send Push Notification</span>

      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Send Push Notifications to Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlecreatePushNotification}>

          <Form.Group className='mb-3' controlId='formBasicUser'>
          <Form.Label>User Type</Form.Label>
          <Form.Select
            name='user_type'
            onChange={(evt) => handleInputChange(evt)}
            aria-label='Default select example'
            required
            value={notificationFormData.user_type}
          >
            <option value=''>Select email receiver</option>
            <option value='allCustomers'>Customers</option>
            <option value='allRiders'>Riders</option>
          </Form.Select>
        </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='message_title'
                placeholder='Enter message title'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Message content </Form.Label>
              <Form.Control
                // style={{ height: '100px' }}
                as='textarea'
                name='message_content'
                placeholder='Message content'
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

export default CreatePushNotification
