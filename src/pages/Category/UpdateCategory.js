import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { useEffect } from 'react'
import { editCategory, getAllCategories } from '../../redux/categorySlice'
import { notification } from 'antd'

const initialFormState = {
  name: '',
  description: '',
}

function UpdateCategory({ category }) {
  const [show, setShow] = useState(false)
  const [categoryFormData, setcategoryFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setcategoryFormData({
      ...categoryFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    setcategoryFormData({
      name: category.name,
      description: category.description,
    })
    console.log('category', category)
  }, [category])

  const clearFormData = () => {
    setcategoryFormData({
      name: '',
      description: '',
    })
  }

  const handleEditCategory = (e) => {
    e.preventDefault()
    const data = {
      name: categoryFormData.name,
      description: categoryFormData.description,
      category_id: category?.id,
    };


    setConfirmLoading(true)
    dispatch(editCategory(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'category/edit/fulfilled') {
          dispatch(getAllCategories())
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'Category updated successfully',
          })
        } else if (response.type === 'category/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notification', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error updating category, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCategory}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter category name'
                defaultValue={categoryFormData.name}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={categoryFormData.description}
                onChange={(evt) => handleInputChange(evt)}
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

export default UpdateCategory
