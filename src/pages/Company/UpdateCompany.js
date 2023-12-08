import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { editCompany, getAllCompanies } from '../../redux/companySlice'
import { notification } from 'antd'

const initialFormState = {
  name: '',
  website: '',
  logo: '',
  description: '',
}

function UpdateCompany({ company }) {
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

  useEffect(() => {
    setcompanyFormData({
      name: company.name,
      website: company.website,
      logo: company.logo,
      description: company.description,
    })
    console.log('company', company)
  }, [company])

  const clearFormData = () => {
    setcompanyFormData({
      name: '',
      website: '',
      logo: '',
      description: '',
    })
    setImage('')
  }

  const handleEditCompany = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', companyFormData.name)
    formData.append('website', companyFormData.website)
    formData.append('logo', image)
    formData.append('description', companyFormData.description)
    formData.append('company_id', company?.id)

    setConfirmLoading(true)
    dispatch(editCompany(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'company/edit/fulfilled') {
          dispatch(getAllCompanies())
          handleClose()
          //   clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'Company updated successfully',
          })
        } else if (response.type === 'company/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating company, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCompany}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter company name'
                defaultValue={companyFormData.name}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type='text'
                name='website'
                placeholder='Enter company website'
                defaultValue={companyFormData.website}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                name='description'
                placeholder='description'
                defaultValue={companyFormData.description}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Logo (Optional)</Form.Label>
              <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
              <span>
                <img src={company?.logo} alt='horse' style={{ with: '70px', height: '70px' }} />
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

export default UpdateCompany
