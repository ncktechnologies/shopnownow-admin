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

const initialFormState = {
  subject_name: '',
  logo: '',
  description: '',
}

function UpdateSubject({ subject }) {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [subjectFormData, setSubjectFormData] = useState(initialFormState)

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
    setSubjectFormData({
      ...subjectFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    setSubjectFormData({
      subject_name: subject.subject_name,
      logo: subject.logo,
      description: subject.description,
    })
    console.log('subject', subject)
  }, [subject])

  const clearFormData = () => {
    setSubjectFormData({
      subject_name: '',
      logo: '',
      description: '',
    })
    setImage('')
  }

  const handleEditSubject = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('subject_name', subjectFormData.subject_name)
    formData.append('logo', image)
    formData.append('description', subjectFormData.description)
    formData.append('subject_id', subject?.id)

    setConfirmLoading(true)
    dispatch(editSubject(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'subject/edit/fulfilled') {
          dispatch(getAllSubjects())
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          Messages.successMessage('Subject updated successfully', 'top-right')
        } else if (response.type === 'subject/edit/rejected') {
          Messages.errorMessage(response?.payload?.message, 'top-right')
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating Subject, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubject}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='subject_name'
                placeholder='Enter subject name'
                defaultValue={subjectFormData.subject_name}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={subjectFormData.description}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Logo (Optional)</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
              <span>
                <img src={subject?.logo} alt='horse' style={{ with: '70px', height: '70px' }} />
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

export default UpdateSubject
