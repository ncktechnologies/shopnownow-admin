import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { createSubject, editSubject, getAllSubjects } from '../../redux/subjectSlice'
import { useEffect } from 'react'
import { editLearnerclass, getAllLearnerclasses } from '../../redux/LearnerClassSlice'

const initialFormState = {
  class_name: '',
  description: '',
}

function UpdateLearnerClass({ learnerclass }) {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [learnerClassFormData, setLearnerClassFormData] = useState(initialFormState)

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
    setLearnerClassFormData({
      ...learnerClassFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    setLearnerClassFormData({
      class_name: learnerclass.class_name,
      description: learnerclass.description,
    })
    console.log('learnerclass', learnerclass)
  }, [learnerclass])

  const clearFormData = () => {
    setLearnerClassFormData({
      class_name: '',
      description: '',
    })
    setImage('')
  }

  const handleEditLearnerclass = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('class_name', learnerClassFormData.class_name)
    formData.append('description', learnerClassFormData.description)
    formData.append('learner_class_id', learnerclass?.id)

    setConfirmLoading(true)
    dispatch(editLearnerclass(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'learnerclass/edit/fulfilled') {
          dispatch(getAllLearnerclasses())
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          Messages.successMessage('learnerclass updated successfully', 'top-right')
        } else if (response.type === 'learnerclass/edit/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating learnerclass, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit learner class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditLearnerclass}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='class_name'
                placeholder='Enter subject name'
                defaultValue={learnerClassFormData.class_name}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={learnerClassFormData.description}
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

export default UpdateLearnerClass
