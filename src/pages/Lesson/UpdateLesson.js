import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { editLesson, getAllLessons } from '../../redux/lessonSlice'
import { notification } from 'antd'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const initialFormState = {
  insurance_id: '',
  title: '',
  image: '',
  description: '',
}

function UpdateLesson({ lesson, insurances }) {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [lessonFormData, setlessonFormData] = useState(initialFormState)

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
    setlessonFormData({
      ...lessonFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    setlessonFormData({
      insurance_id: lesson.insurance_id,
      title: lesson.title,
      image: lesson.image,
      description: lesson.description,
    })
  }, [lesson])

  const clearFormData = () => {
    setlessonFormData({
      insurance_id: '',
      title: '',
      image: '',
      description: '',
    })
    setImage('')
  }

  const handleEditLesson = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('insurance_id', lessonFormData.insurance_id)
    formData.append('title', lessonFormData.title)
    formData.append('image', image)
    formData.append('description', lessonFormData.description)
    formData.append('lesson_id', lesson?.id)

    setConfirmLoading(true)
    dispatch(editLesson(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'lesson/edit/fulfilled') {
          dispatch(getAllLessons())
          handleClose()
          //   clearFormData()
          notification.success({ message: 'Lesson updated successfully' })
        } else if (response.type === 'lesson/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating lesson, please try again')
      })
  }

  const insurance_list =
    insurances &&
    insurances?.data?.map((insurance, key) => {
      return (
        <option
          value={insurance.id}
          key={key}
          selected={insurance.id == lesson.insurance_id ? true : false}
        >
          {insurance.name}
        </option>
      )
    })
  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditLesson}>
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
                  <span>
                    <img src={lesson?.image} alt='horse' style={{ with: '70px', height: '70px' }} />
                  </span>
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
                placeholder='Enter lesson name'
                defaultValue={lessonFormData.title}
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
                name='description'
                placeholder='description'
                defaultValue={lessonFormData.description}
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

export default UpdateLesson
