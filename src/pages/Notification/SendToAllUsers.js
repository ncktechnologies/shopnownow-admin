import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { sendToAllUsers, getAllNotifications } from '../../redux/notificationSlice'

const initialFormState = {
  title: '',
  body: '',
}

function SendToAllUsers() {
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
      title: '',
      body: '',
    })
  }

  const handleSendToAllUsers = (e) => {
    e.preventDefault()

    const data = {
      title: notificationFormData.title,
      body: notificationFormData.body,

    }

    console.log(data)

    setConfirmLoading(true)
    dispatch(sendToAllUsers(data))
      .then((response) => {

        setConfirmLoading(false)
        if (response.type === 'sendtoall/create/fulfilled') {
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'notification created successfully',
          })
        } else if (response.type === 'sendtoall/create/rejected') {
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
      <span onClick={handleShow}>Send notification to all users </span>

      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Send notification to all users </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendToAllUsers}>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter message title'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Message content </Form.Label>
              <Form.Control
                as='textarea'
                name='body'
                placeholder='Message content'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

          

            <Button variant='primary' style={{color: '#fff', backgroundColor:'#ff0303', border: 'none'}} type='submit' disabled={confirmLoading ? true : false}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default SendToAllUsers
