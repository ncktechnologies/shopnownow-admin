import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { createQuickGuide, getAllQuickGuides } from '../../redux/quickGuideSlice'
import { notification } from 'antd'

const initialFormState = {
  title: '',
  body: '',
  image: '',
}

function CreateQuickGuide() {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [quickGuideFormData, setQuickGuideFormData] = useState(initialFormState)

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
    setQuickGuideFormData({
      ...quickGuideFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setQuickGuideFormData({
      title: '',
      body: '',
      image: '',
    })
    setImage('')
  }

  const handleCreateQuickGuide = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('title', quickGuideFormData.title)
    formData.append('image', image)
    formData.append('body', quickGuideFormData.body)

    setConfirmLoading(true)
    dispatch(createQuickGuide(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'quickGuide/create/fulfilled') {
          dispatch(getAllQuickGuides())
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'quick guide created successfully',
          })
        } else if (response.type === 'quickGuide/create/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error created quick guide, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error creating  quick guide, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Create quick guide</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create quick guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateQuickGuide}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter title'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Body </Form.Label>
              <Form.Control
                type='text'
                name='body'
                placeholder='body'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
            </Form.Group>

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}  style={{
                background: "#ff0303",
                color: "#fff",
                border: "none",
              }}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default CreateQuickGuide
