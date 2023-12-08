import React, { useState, useEffect } from 'react'
import { PageHeader } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import {
  createVarietyBox,
  addItemsToVarietyBox,
  getVarietyBoxCategory,
} from '../../redux/varietyBoxSlice'
import { getAllSubjects } from '../../redux/subjectSlice'
import { getAllLearnerAges } from '../../redux/LearnerAgeSlice'
import { getAllLearnerclasses } from '../../redux/LearnerClassSlice'
import { addCourseContent, createCourse, getAllCourses } from '../../redux/courseSlice'

const initialFormState = {
  subject_id: '',
  learner_class_id: '',
  learner_age_id: '',
  course_title: '',
  course_fee: '',
  percentage_discount: '',
  read_duration: '',
  content_source_url: '',
  thumbnail: '',
  description: '',
  course_contents: [{ course_content_url: '' }],
}

function CreateCourse() {
  const [image, setImage] = useState('')
  const [CourseFormData, setCourseFormData] = useState(initialFormState)
  const { subjects } = useSelector((state) => state)
  const { learnerClasses } = useSelector((state) => state)
  const { learnerAges } = useSelector((state) => state)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const [allsubjects, setSubjects] = useState(subjects?.data)
  const [alllearnerclasses, setLearnerclass] = useState(learnerClasses?.data)
  const [alllearnerages, setLearnerAge] = useState(learnerAges?.data)
  const navigate = useNavigate()
  const [CourseContent, setCourseContent] = useState([{ course_content_url: '' }])
  const [validated, setValidated] = useState(false)
  const [variety_box_category, setVarietyBoxCategory] = useState({ id: '', name: '' })

  useEffect(() => {
    dispatch(getAllSubjects())
    dispatch(getAllLearnerAges())
    dispatch(getAllLearnerclasses())
  }, [])

  //   const showVarietyboxCategory = () => {
  //     dispatch(getVarietyBoxCategory())
  //       .then((response) => {
  //         if (response.type === 'varietyBox/getCategory/fulfilled') {
  //           console.log('varity category success response', response?.payload)
  //           setVarietyBoxCategory({ id: response?.payload?.id, name: response?.payload?.name })
  //         } else if ('varietyBox/getCategory/rejected') {
  //           console.log('varity category error response', response)
  //         }
  //       })
  //       .catch((error) => {
  //         console.log('variety box category', error)
  //       })
  //   }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setCourseFormData({
      ...CourseFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setCourseFormData({
      subject_id: '',
      learner_class_id: '',
      learner_age_id: '',
      course_title: '',
      course_fee: '',
      percentage_discount: '',
      read_duration: '',
      content_source_url: '',
      thumbnail: '',
      description: '',
      course_contents: [{ course_content_url: '' }],
    })
    setImage('')
    setCourseContent([{ course_content_url: '' }])
  }

  const handleCreateVarietyBox = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    setValidated(true)
    var formData = new FormData()
    formData.append(' subject_id', CourseFormData?.subject_id)
    formData.append('image', image)
    formData.append(' learner_class_id', CourseFormData?.learner_class_id)
    formData.append('learner_age_id', CourseFormData?.learner_age_id)
    formData.append('course_title', CourseFormData?.course_title)
    formData.append('course_fee', CourseFormData?.course_fee)
    formData.append('percentage_discount', CourseFormData?.percentage_discount)
    formData.append('read_duration', CourseFormData?.read_duration)
    formData.append('content_source_url', CourseFormData?.content_source_url)
    formData.append('description', CourseFormData?.description)

    // const formData = {
    //   subject_id: CourseFormData?.subject_id,
    //   learner_class_id: CourseFormData?.learner_class_id,
    //   learner_age_id: CourseFormData?.learner_age_id,
    //   course_title: CourseFormData?.course_title,
    //   course_fee: CourseFormData?.course_fee,
    //   percentage_discount: CourseFormData?.percentage_discount,
    //   read_duration: CourseFormData?.read_duration,
    //   content_source_url: CourseFormData?.content_source_url,
    //   thumbnail: image,
    //   description: CourseFormData?.description,
    //   course_contents: [{ course_content_url: '' }],
    // }

    setConfirmLoading(true)
    dispatch(createCourse(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'course/create/fulfilled') {
          var courseContentData = {
            course_id: response?.payload?.id,
            course_contents: CourseContent,
          }
          console.log('courseContentData', courseContentData)
          if (courseContentData?.course_contents.length >= 1) {
            dispatch(addCourseContent(courseContentData))
          }
          dispatch(getAllCourses())
          console.log('new course', response)
          clearFormData()
          document.getElementById('create-course-form').reset()
          Messages.successMessage('course created successfully', 'top-right')
        } else if (response.type === 'course/create/rejected') {
          console.log('error notificatom', 'Error creating course, please try again')
          Messages.errorMessage('Error creating course, please try again', 'top-right')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating varietyBox, please try again')
        Messages.errorMessage('Error creating varietyBox, please try again', 'top-right')
      })
  }
  const subjects_list =
    allsubjects &&
    allsubjects.map((subject, key) => {
      return (
        <option value={subject.id} key={key}>
          {subject.subject_name}
        </option>
      )
    })

  const learnerclasses_list =
    alllearnerclasses &&
    alllearnerclasses.map((learnerclass, key) => {
      return (
        <option value={learnerclass.id} key={key}>
          {learnerclass.class_name}
        </option>
      )
    })

  const learneraga_list =
    alllearnerages &&
    alllearnerages.map((learnerage, key) => {
      return (
        <option value={learnerage.id} key={key}>
          {learnerage.name}
        </option>
      )
    })

  let handleChange = (i, e) => {
    if (!isNaN(e.target.value)) {
      let newCourseContent = [...CourseContent]
      newCourseContent[i][e.target.name] = e.target.value
      setCourseContent(newCourseContent)

      console.log(' CourseContent values', newCourseContent)
    } else {
      let newCourseContent = [...CourseContent]
      newCourseContent[i][e.target.name] = ''
      setCourseContent(newCourseContent)
    }
  }

  let addFormFields = () => {
    if (CourseContent && CourseContent.length == 5) {
      alert("You can't add more than 5 items")
      return
    }
    setCourseContent([...CourseContent, { course_content_url: '' }])
    console.log('multi related products', CourseContent)
  }

  let removeFormFields = (i) => {
    let newCourseContent = [...CourseContent]
    newCourseContent.splice(i, 1)
    setCourseContent(newCourseContent)
    console.log('remove multi related products', newCourseContent)
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='varietybox' variant='light'>
            <Link to='/variety-boxes'>Back to list </Link>
          </Button>,
        ]}
        title='Create Course'
      />

      <Card>
        <Card.Header>
          <small>
            Fields marked with an asterisk (<span style={{ color: 'red' }}>*</span>) are required
          </small>
        </Card.Header>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleCreateVarietyBox}
            id='create-varietybox-form'
          >
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>
                    Name <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    required
                    name='name'
                    placeholder='Name'
                    onChange={(evt) => handleInputChange(evt)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    The product name is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    subject <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select name='subject_id' aria-label='Default select example' required>
                    <option>Select subject</option>
                    {subjects_list}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>
                    Learner class <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select name='learner_class_id' aria-label='Default select example' required>
                    <option>Select learner class</option>
                    {learnerclasses_list}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    The product name is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    LearnerAges <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select name='learner_age_id' aria-label='Default select example' required>
                    <option>Select learner_age</option>
                    {learneraga_list}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Individual price <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type='number'
                    name='individual_price'
                    onChange={(evt) => handleInputChange(evt)}
                    placeholder='Individual price'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The group price field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Group price <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type='number'
                    name='group_price'
                    onChange={(evt) => handleInputChange(evt)}
                    placeholder='Group price'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The individual price field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Quantity in-stock <span style={{ color: 'red' }}>*</span>{' '}
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='quantity_instock'
                    placeholder='Quantity in-stock'
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The quantity in-stock field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Variety box size <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name='variety_box_size'
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  >
                    <option>Select size</option>
                    <option value='small'>Small</option>
                    <option value='medium'>medium</option>
                    <option value='large'>Large</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    The variety box size field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Description {CourseFormData.description}</Form.Label>
                  <Form.Control
                    as='textarea'
                    placeholder='Leave a comment here'
                    style={{ height: '100px' }}
                    name='description'
                    onChange={(evt) => handleInputChange(evt)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>
                  <strong>Add Course Content</strong>
                </h6>

                {CourseContent.map((element, index) => (
                  <div className='form-inline' key={index}>
                    <InputGroup>
                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Content {index + 1}</Form.Label>

                        <Form.Control
                          as='textarea'
                          placeholder='Leave a comment here'
                          style={{ height: '100px' }}
                          name='description'
                          onChange={(evt) => handleInputChange(evt)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          The learner class field is required.
                        </Form.Control.Feedback>
                      </Form.Group>
                      {index ? (
                        <span
                          className='button remove'
                          onClick={() => removeFormFields(index)}
                          style={{ color: 'red', cursor: 'pointer' }}
                          title='Delete from list'
                        >
                          Remove
                        </span>
                      ) : null}
                    </InputGroup>
                  </div>
                ))}
                <div className='button-section'>
                  <button
                    className='button add mb-3 float-centre'
                    type='button'
                    onClick={() => addFormFields()}
                  >
                    Add More
                  </button>
                </div>
              </Col>
            </Row>

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Card.Body>
        <ToastContainer />
      </Card>
    </div>
  )
}
export default CreateCourse
