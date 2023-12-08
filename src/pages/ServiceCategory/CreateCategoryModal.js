import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { createServiceCategory, getAllServiceCategory } from '../../redux/serviceCategorySlice'
import Messages from '../../ToastMessages/Messages'

const initialFormState = {
  name: '',
  description: '',
}

function CreateCategoryModal() {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [categoryFormData, setCategoryFormData] = useState(initialFormState)

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

  const handleCreateCategory = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', categoryFormData.name)
    formData.append('image', image)
    formData.append('description', categoryFormData.description)
    console.log('formvalues', formData)

    setConfirmLoading(true)
    dispatch(createServiceCategory(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'serviceCategory/create/fulfilled') {
          dispatch(getAllServiceCategory())
          handleClose()
          clearFormData()
          Messages.successMessage('category created successfully', 'top-right')
        } else if (response.type === 'serviceCategory/create/rejected') {
          console.log('error notification', 'Error creating service category, please try again')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error creating service category, please try again')
      })
  }

  return (
    <>
      <Button variant='default' onClick={handleShow} style={{color: '#fff', backgroundColor:'#FEAE0D'}}>
        Create Service Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCategory}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name{categoryFormData.name}</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter category name'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description {categoryFormData.description}</Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
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

export default CreateCategoryModal
