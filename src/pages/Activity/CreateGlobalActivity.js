import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { createGlobalActivity, getAllActivities } from '../../redux/activitySlice'

const initialFormState = {
  activity_date: '',
  title: '',
  description: '',
  image: '',
}

function CreateGlobalActivity() {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [activityFormData, setActivityFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setActivityFormData({
      ...activityFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setActivityFormData({
      activity_date: '',
      title: '',
      description: '',
      image: '',
    })
    setImage('')
  }

  const formatDate = (date) => {
    let objectDate = new Date(date)
    let day = objectDate.getDate()

    let month = objectDate.getMonth()

    let year = objectDate.getFullYear()

    let format = day + '/' + month + '/' + year
    return format
  }

  const handleCreateGlobalActivity = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('title', activityFormData.title)
    formData.append('image', image)
    formData.append('description', activityFormData.description)
    formData.append('activity_date', activityFormData.activity_date)

    setConfirmLoading(true)
    dispatch(createGlobalActivity(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'activity/global/create/fulfilled') {
          dispatch(getAllActivities())
          handleClose()
          clearFormData()
          console.log('response act', response)
          Messages.successMessage('Global activity created successfully', 'top-right')
        } else if (response.type === 'activity/global/create/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating global activity, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Create Global Activity</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create Global Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateGlobalActivity}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Activity date{activityFormData.activity_date}</Form.Label>
              <Form.Control
                type='date'
                name='activity_date'
                placeholder='Enter activity date'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name{activityFormData.title}</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter title'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description {activityFormData.description}</Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
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

export default CreateGlobalActivity
