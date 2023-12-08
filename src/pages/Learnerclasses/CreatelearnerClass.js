import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'

import { createLearnerclass, getAllLearnerclasses } from '../../redux/LearnerClassSlice'

const initialFormState = {
  class_name: '',
  description: '',
}

function CreatelearnerClass() {
  const [show, setShow] = useState(false)
  const [learnerClassFormData, setLearnerClassFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setLearnerClassFormData({
      ...learnerClassFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setLearnerClassFormData({
      class_name: '',
      description: '',
    })
  }

  const handleCreateLearnerClass = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('class_name', learnerClassFormData.class_name)
    formData.append('description', learnerClassFormData.description)

    setConfirmLoading(true)
    dispatch(createLearnerclass(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'learnerclass/create/fulfilled') {
          dispatch(getAllLearnerclasses())
          handleClose()
          clearFormData()
          console.log('response act', response)
          Messages.successMessage('learner class created successfully', 'top-right')
        } else if (response.type === 'learnerclass/create/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating learner class, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Create learner class</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create Learner Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateLearnerClass}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='class_name'
                placeholder='Enter Learner Class name'
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

export default CreatelearnerClass
