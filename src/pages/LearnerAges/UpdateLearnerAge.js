import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { editLearnerAge, getAllLearnerAges } from '../../redux/LearnerAgeSlice'

const initialFormState = {
  name: 'something',
  description: '',
}

function UpdateLearnerAge({ learnerage }) {
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

  useEffect(() => {
    setLearnerAgeFormData({
      name: learnerage?.name,
      description: learnerage?.description,
    })
    console.log('learnerage', learnerage)
  }, [learnerage])

  const clearFormData = () => {
    setLearnerAgeFormData({
      name: '',
      description: '',
    })
  }

  const handleEditLearnerAge = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', learnerAgeFormData.name)
    formData.append('description', learnerAgeFormData.description)
    formData.append('learner_age_id', learnerage?.id)

    setConfirmLoading(true)
    dispatch(editLearnerAge(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'learnerage/edit/fulfilled') {
          dispatch(getAllLearnerAges())
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          Messages.successMessage('learner age updated successfully', 'top-right')
        } else if (response.type === 'learnerage/edit/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating learner age, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit learner age</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditLearnerAge}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name {learnerAgeFormData.name}</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter subject name'
                defaultValue={learnerAgeFormData.name}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={learnerAgeFormData.description}
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

export default UpdateLearnerAge
