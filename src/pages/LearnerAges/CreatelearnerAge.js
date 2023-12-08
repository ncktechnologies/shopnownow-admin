import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'

import { createLearnerclass, getAllLearnerclasses } from '../../redux/LearnerClassSlice'
import { createLearnerAge, getAllLearnerAges } from '../../redux/LearnerAgeSlice'

const initialFormState = {
  name: '',
  description: '',
}

function CreatelearnerAge() {
  const [show, setShow] = useState(false)
  const [learnerAgeFormData, setLearnerAgeFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setLearnerAgeFormData({
      ...learnerAgeFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setLearnerAgeFormData({
      name: '',
      description: '',
    })
  }

  const handleCreateLearnerAge = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', learnerAgeFormData.name)
    formData.append('description', learnerAgeFormData.description)

    setConfirmLoading(true)
    dispatch(createLearnerAge(formData))
      .then((response) => {
        setConfirmLoading(false)

        if (response.type === 'learnerage/create/fulfilled') {
          dispatch(getAllLearnerAges())
          handleClose()
          clearFormData()
          console.log('response act', response)
          Messages.successMessage('learner age created successfully', 'top-right')
        } else if (response.type === 'learnerage/create/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating learner age, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Create learner age</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create Learner age</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateLearnerAge}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter Learner age name'
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

export default CreatelearnerAge
