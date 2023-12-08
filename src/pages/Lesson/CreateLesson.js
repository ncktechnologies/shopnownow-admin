import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { createLesson, getAllLessons } from '../../redux/lessonSlice'
import { notification } from 'antd'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { data } from 'jquery'
// import { getAllInsurances } from '../../redux/InsuranceSlice'

const initialFormState = {
  insurance_id: '',
  title: '',
  image: '',
  description: '',
}

function CreateLesson({ insurances }) {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [lessonFormData, setlessonFormData] = useState(initialFormState)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {}, [])
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setlessonFormData({
      ...lessonFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setlessonFormData({
      insurance_id: '',
      title: '',
      image: '',
      description: '',
    })
    setImage('')
  }

  const handleCreateLesson = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('insurance_id', lessonFormData.insurance_id)
    formData.append('title', lessonFormData.title)
    formData.append('image', image)
    formData.append('description', lessonFormData.description)

    setConfirmLoading(true)
    dispatch(createLesson(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'lesson/create/fulfilled') {
          dispatch(getAllLessons())
          handleClose()
          clearFormData()
          notification.success({
            message: 'Lesson created successfully',
          })
        } else if (response.type === 'lesson/create/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating lesson, please try again')
      })
  }

  const insurance_list =
    insurances &&
    insurances?.data?.map((insurance, key) => {
      return (
        <option value={insurance.id} key={key}>
          {insurance.name}
        </option>
      )
    })
  return (
    <>
      <span onClick={handleShow}>Create lesson</span>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateLesson}>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Insurance <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name='insurance_id'
                    onChange={(evt) => handleInputChange(evt)}
                    aria-label='Default select example'
                    required
                  >
                    <option value={''}>select insurance</option>
                    {insurance_list}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    image <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>
                Title <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Enter lesson title'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>
                Description <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                style={{ height: '200px' }}
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

export default CreateLesson
