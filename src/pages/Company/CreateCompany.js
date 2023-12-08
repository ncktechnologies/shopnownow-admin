import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { createCompany, getAllCompanies } from '../../redux/companySlice'
import { notification } from 'antd'

const initialFormState = {
  name: '',
  website: '',
  logo: '',
  description: '',
}

function CreateCompany() {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [companyFormData, setcompanyFormData] = useState(initialFormState)

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
    setcompanyFormData({
      ...companyFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setcompanyFormData({
      name: '',
      website: '',
      logo: '',
      description: '',
    })
    setImage('')
  }

  const handleCreateCompany = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', companyFormData.name)
    formData.append('website', companyFormData.website)
    formData.append('logo', image)
    formData.append('description', companyFormData.description)

    setConfirmLoading(true)
    dispatch(createCompany(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'company/create/fulfilled') {
          dispatch(getAllCompanies())
          handleClose()
          clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'Company created successfully',
          })
        } else if (response.type === 'company/create/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting company, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating company, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Create company</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCompany}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter company name'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type='text'
                name='website'
                placeholder='Enter company website'
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

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Logo (Optional)</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
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

export default CreateCompany
