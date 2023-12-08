import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { useEffect } from 'react'
import { editBanner, getAllBanners } from '../../redux/bannerSlice'

const initialFormState = {
  title: '',
  banner: '',
  description: '',
}

function UpdateBanner({ banner }) {
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

  useEffect(() => {
    setbannerFormData({
      title: banner.title,
      banner: banner.banner,
      description: banner.description,
    })
    console.log('banner', banner)
  }, [banner])

  const clearFormData = () => {
    setbannerFormData({
      title: '',
      banner: '',
      description: '',
    })
    setImage('')
  }

  const handleEditBanner = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('title', bannerFormData.title)
    formData.append('banner', image)
    formData.append('description', bannerFormData.description)
    formData.append('banner_id', banner?.id)

    setConfirmLoading(true)
    dispatch(editBanner(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'banner/edit/fulfilled') {
          dispatch(getAllBanners())
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          Messages.successMessage('banner updated successfully', 'top-right')
        } else if (response.type === 'banner/edit/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating banner, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditBanner}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter banner name'
                defaultValue={bannerFormData.title}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={bannerFormData.description}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>banner (Optional)</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
              <span>
                <img src={banner?.banner} alt='horse' style={{ with: '70px', height: '70px' }} />
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

export default UpdateBanner
