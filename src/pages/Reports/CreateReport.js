import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { createNotification, getAllNotifications } from '../../redux/notificationSlice'
import { getAllUsers } from '../../redux/userSlice'

const initialFormState = {
  message_title: '',
  message_content: '',
  user_ids: '',
}

function CreateNotification() {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [notificationFormData, setnotificationFormData] = useState(initialFormState)
  const { users } = useSelector((state) => state)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState([])

  const handleClose = () => {
    setShow(false)
    setSelected([])
  }
  const handleShow = () => {
    setShow(true)
    dispatch(getAllUsers)
  }

  useEffect(() => {
    dispatch(getAllUsers)
    console.log('users', users)
  }, [])

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
    })
    setImage('')
  }

  const handleCreateNotification = (e) => {
    e.preventDefault()
    // var formData = new FormData()
    // formData.append('message_title', notificationFormData.message_title)
    // formData.append('message_content', notificationFormData.message_content)
    const data = {
      message_title: notificationFormData.message_title,
      message_content: notificationFormData.message_content,
      users: selected,
    }
    if (selected.length < 1) {
      notification.error({
        message: 'No user selected. Please select at leat one user',
      })
      // handleClose()
      return
    }
    setConfirmLoading(true)
    dispatch(createNotification(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'notification/create/fulfilled') {
          dispatch(getAllNotifications())
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'notification created successfully',
          })
        } else if (response.type === 'notification/create/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating notification, please try again')
      })
  }

  const addUserToArray = (e, userid) => {
    e.preventDefault()
    // alert(userid)
    if (e.target.checked) {
      // let inprogressIndex = selected.indexOf(userid)
      // if (inprogressIndex > -1) {
      //   setSelected([...selected.splice(inprogressIndex, 1)])
      // } else {
      //   setSelected([...selected, userid])
      // }
      setSelected([...selected, userid])
    } else {
      setSelected([...selected.filter((val) => val !== userid)])
      console.log('selected', selected)
    }

    // const { checked, value } = e.currentTarget
    // setSelected((prev) => (checked ? [...prev, value] : prev.filter((val) => val !== value)))
  }

  const handleChange = (e, i) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value])
    } else {
      setSelected([...selected.filter((val) => val !== e.target.value)])
    }
    // setSelected((prev) =>
    //   e.target.checked ? [...prev, e.target.value] : prev.filter((val) => val !== e.target.value),
    // )
    console.log('new selected value', selected)

    // if (e.target.checked) {
    //   let inprogressIndex = selected.indexOf(e.target.value)
    //   if (inprogressIndex > -1) {
    //     setSelected([...selected])
    //   } else {
    //     setSelected([...selected, e.target.value])
    //   }
    //   console.log('selected value', selected)
    // } else {
    //   let inprogressIndex = selected.indexOf(e.target.value)
    //   if (inprogressIndex > -1) {
    //     setSelected([...selected.splice(inprogressIndex, 1)])
    //   }
    //   console.log('new selected value', selected)

    //   // setSelected([...selected.splice(inprogressIndex, 1)])
    //   // setSelected([...selected, e.target.value])
    // }
  }

  const user_list =
    users &&
    users?.data?.map((user, key) => {
      return (
        <label key={key}>
          {user.first_name} {user.last_name}{' '}
          <input
            type='checkbox'
            defaultValue={user.id}
            name='user_ids'
            onClick={(e) => handleChange(e, user.id)}
          />
          &nbsp;
        </label>
      )
    })

  return (
    <>
      <span onClick={handleShow}>Send Email notification</span>

      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Send Email Notifications to User(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateNotification}>
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

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <h3>Select user(s)</h3>
              {user_list}
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

export default CreateNotification
