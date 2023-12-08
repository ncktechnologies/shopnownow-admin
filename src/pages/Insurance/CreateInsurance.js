import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { createInsurance, getAllInsurances } from '../../redux/InsuranceSlice'
import { notification } from 'antd'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const initialFormState = {
  name: '',
  banner: '',
  description: '',
  price: '',
  category_id: '',
  company_id: '',
  terms_condition: '',
  discount: '',
  insurance_policy: 'price',
  insurance_policy_percentage_value: '',
}

function CreateInsurance({ categories, companies }) {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState('')
  const [insuranceFormData, setinsuranceFormData] = useState(initialFormState)

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
    setinsuranceFormData({
      ...insuranceFormData,
      [name]: value,
    })
  }
  useEffect(() => {}, [])
  const clearFormData = () => {
    setinsuranceFormData({
      name: '',
      banner: '',
      description: '',
      price: '',
      category_id: '',
      company_id: '',
      terms_condition: '',
      discount: '',
      insurance_policy: '',
      insurance_policy_percentage_value: '',
    })
    setImage('')
  }

  const handleCreateInsurance = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', insuranceFormData.name)
    formData.append('banner', image)
    formData.append('description', insuranceFormData.description)
    formData.append('price', insuranceFormData.price)
    formData.append('category_id', insuranceFormData.category_id)
    formData.append('company_id', insuranceFormData.company_id)
    formData.append('terms_condition', insuranceFormData.terms_condition)
    formData.append('discount', insuranceFormData.discount)
    formData.append('insurance_policy', insuranceFormData.insurance_policy)
    formData.append(
      'insurance_policy_percentage_value',
      insuranceFormData.insurance_policy_percentage_value,
    )

    setConfirmLoading(true)
    dispatch(createInsurance(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'insurance/create/fulfilled') {
          dispatch(getAllInsurances())
          handleClose()
          clearFormData()
          notification.success({
            message: 'insurance created successfully',
          })
        } else if (response.type === 'insurance/create/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating insurance, please try again')
      })
  }

  const category_list =
    categories &&
    categories.map((category, key) => {
      return (
        <option value={category.id} key={key}>
          {category.name}
        </option>
      )
    })

  const company_list =
    companies &&
    companies.map((company, key) => {
      return (
        <option value={company.id} key={key}>
          {company.name}
        </option>
      )
    })

  return (
    <>
      <span onClick={handleShow}>Create insurance</span>

      <Modal show={show} onHide={handleClose} size='lg' backdrop='static'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Create insurance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateInsurance}>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Category <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name='category_id'
                    onChange={(evt) => handleInputChange(evt)}
                    aria-label='Default select example'
                    required
                  >
                    <option value={''}>select category</option>
                    {category_list}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Company <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name='company_id'
                    onChange={(evt) => handleInputChange(evt)}
                    aria-label='Default select example'
                    required
                  >
                    <option>select category</option>
                    {company_list}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>
                    Name<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    placeholder='Enter insurance name'
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Banner<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} required />
                </Form.Group>
                <Form.Control.Feedback type='invalid'>
                  The banner field is required.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Insurance policy
                    <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name='insurance_policy'
                    onChange={(evt) => handleInputChange(evt)}
                    aria-label='Default select example'
                    required
                  >
                    <option value='price'>Price</option>
                    <option value='percentage'>Percentage</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    The insurance_policy field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                {insuranceFormData && insuranceFormData?.insurance_policy == 'price' ? (
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>
                      price <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type='number'
                      name='price'
                      onChange={(evt) => handleInputChange(evt)}
                      placeholder='Enter Price'
                      required={insuranceFormData.insurance_policy == 'price' ? true : false}
                    />
                    <Form.Control.Feedback type='invalid'>
                      The price field is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>
                      Percentage <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      name='insurance_policy_percentage_value'
                      onChange={(evt) => handleInputChange(evt)}
                      placeholder='Enter percentage value'
                      required={insuranceFormData.insurance_policy == 'price' ? false : true}
                    />
                    <Form.Control.Feedback type='invalid'>
                      The insurance_policy_percentage_value field is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type='number'
                    name='discount'
                    onChange={(evt) => handleInputChange(evt)}
                    placeholder='discount'
                    disabled={insuranceFormData.insurance_policy == 'price' ? false : true}
                  />
                  <Form.Control.Feedback type='invalid'>
                    The discount field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                as='textarea'
                style={{ height: '100px' }}
                name='description'
                placeholder='description'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Terms and Conditions </Form.Label>
              <Form.Control
                as='textarea'
                style={{ height: '100px' }}
                name='terms_condition'
                placeholder='terms_condition'
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default CreateInsurance
