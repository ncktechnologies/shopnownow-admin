import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import {
  createGlobalActivity,
  editGlobalActivity,
  getAllActivities,
} from '../../redux/activitySlice'
import { useEffect } from 'react'

const initialFormState = {
  activity_date: '',
  title: '',
  description: '',
  image: '',
}

function UpdateGlobalActivity({ activity }) {
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

  useEffect(() => {
    setActivityFormData({
      title: activity.title,
      description: activity.description,
      activity_date: activity.activity_date,
    })
    console.log('activity', activity)
  }, [activity])

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

  const handleEditGlobalActivity = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('title', activityFormData.title)
    formData.append('image', image)
    formData.append('description', activityFormData.description)
    formData.append('activity_date', activityFormData.activity_date)
    formData.append('activity_id', activity?.id)

    // console.log('formvalues', formData)

    setConfirmLoading(true)
    dispatch(editGlobalActivity(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'activity/global/edit/fulfilled') {
          dispatch(getAllActivities())
          handleClose()
          clearFormData()
          Messages.successMessage('Global activity updated successfully', 'top-right')
        } else if (response.type === 'activity/global/edit/rejected') {
          console.log('error notificatom', 'Error editing Global activity, please try again')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error editing global activity, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Global Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditGlobalActivity}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Activity date{activityFormData.activity_date}</Form.Label>
              <Form.Control
                type='date'
                name='activity_date'
                placeholder='Enter activity date'
                defaultValue={activityFormData.activity_date}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name{activityFormData.title}</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter title'
                defaultValue={activityFormData.title}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description {activityFormData.description}</Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={activityFormData.description}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
              <span>
                <img
                  src={activity?.image_url}
                  alt='horse'
                  style={{ with: '70px', height: '70px' }}
                />
              </span>
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

export default UpdateGlobalActivity
