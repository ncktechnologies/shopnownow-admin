import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { editServiceCategory, getAllServiceCategory } from '../../redux/serviceCategorySlice'
import Messages from '../../ToastMessages/Messages'
import { useDispatch, useSelector } from 'react-redux'

const initialFormState = {
  name: '',
  description: '',
}

function UpdateCategoryModal({ category }) {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [categoryFormData, setCategoryFormData] = useState(initialFormState)
  const { serviceCategory } = useSelector((state) => state)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    setCategoryFormData({
      name: category.name,
      description: category.description,
    })
    console.log('category', category)
  }, [category])

  const onChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setCategoryFormData({
      ...categoryFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setCategoryFormData({
      name: '',
      description: '',
    })
    setImage('')
  }

  const handleUpdateCategory = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', categoryFormData.name)
    formData.append('image', image)
    formData.append('description', categoryFormData.description)
    formData.append('category_id', category?.id)

    // return
    setConfirmLoading(true)
    dispatch(editServiceCategory(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'serviceCategory/edit/fulfilled') {
          dispatch(getAllServiceCategory())
          handleClose()
          clearFormData()
          Messages.successMessage('category updated successfully', 'top-right')
        } else if (response.type === 'serviceCategory/edit/rejected') {
          console.log('error notificatom', 'Error updating service category, please try again')
          Messages.errorMessage('Error updating category', 'top-right')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error editing service category, please try again')
      })
  }

  return (
    <>
      <Button variant='default' onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateCategory}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                defaultValue={category.name}
                placeholder='Enter category name'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={category.description}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                onChange={(evnt) => onChangeImage(evnt)}
                placeholder='Password'
              />
              <span>
                <img src={category?.image} alt='horse' style={{ with: '70px', height: '70px' }} />
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

export default UpdateCategoryModal
