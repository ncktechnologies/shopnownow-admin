import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { useEffect } from 'react'
import { editQuickGuide, getAllQuickGuides } from '../../redux/quickGuideSlice'

const initialFormState = {
  title: '',
  body: '',
  image: '',
}

function UpdateQuickGuide({ quickGuide }) {
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

  useEffect(() => {
    setQuickGuideFormData({
      title: quickGuide.title,
      image: quickGuide.image,
      body: quickGuide.body,
    })
  }, [quickGuide])

  const clearFormData = () => {
    setQuickGuideFormData({
      title: '',
      body: '',
      image: '',
    })
    setImage('')
  }

  const handleEditQuickGuide = (e) => {
    e.preventDefault()

    const data = {
      title: quickGuideFormData.title,
      body: quickGuideFormData.body,
      id: quickGuide.id
    }

    setConfirmLoading(true)
    dispatch(editQuickGuide(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'quickGuide/edit/fulfilled') {
          dispatch(getAllQuickGuides())
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          Messages.successMessage('quickGuide updated successfully', 'top-right')
        } else if (response.type === 'quickGuide/edit/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notification', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating quick Guide, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit quick guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditQuickGuide}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter QuickGuide title'
                defaultValue={quickGuideFormData.title}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Body </Form.Label>
              <Form.Control
                type='text'
                name='body'
                placeholder='body'
                defaultValue={quickGuideFormData.body}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            {/* <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label> Image</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
              <span>
                <img src={quickGuide?.image} alt='image' style={{ with: '70px', height: '70px' }} />
              </span>
            </Form.Group> */}

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false} style={{
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

export default UpdateQuickGuide
