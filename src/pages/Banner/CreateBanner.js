import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { createBanner, getAllBanners } from '../../redux/bannerSlice'
import { notification } from 'antd'

const initialFormState = {
  title: '',
  banner: '',
  description: '',
}

function CreateBanner() {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [bannerFormData, setbannerFormData] = useState(initialFormState)

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
    setbannerFormData({
      ...bannerFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setbannerFormData({
      title: '',
      banner: '',
      description: '',
    })
    setImage('')
  }

  const handleCreateBanner = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('title', bannerFormData.title)
    formData.append('banner', image)
    formData.append('description', bannerFormData.description)

    setConfirmLoading(true)
    dispatch(createBanner(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'banner/create/fulfilled') {
          dispatch(getAllBanners())
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'Banner deleted successfully',
          })
        } else if (response.type === 'banner/create/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting banner, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating  banner, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Create banner</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateBanner}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter title name'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>banner (Optional)</Form.Label>
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

export default CreateBanner
