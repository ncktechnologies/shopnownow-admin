import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { editInsurance, getAllInsurances } from '../../redux/InsuranceSlice'
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
  insurance_policy: '',
  insurance_policy_percentage_value: '',
}

function UpdateInsurance({ insurance, categories, companies }) {
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

  useEffect(() => {
    setinsuranceFormData({
      name: insurance.name,
      banner: insurance.banner,
      description: insurance.description,
      price: insurance.price,
      category_id: insurance.category_id,
      company_id: insurance.company_id,
      terms_condition: insurance.terms_condition,
      discount: insurance.discount,
      insurance_policy: insurance.insurance_policy,
      insurance_policy_percentage_value: insurance.insurance_policy_percentage_value,
    })
    // console.log('insurance', insurance)
  }, [insurance])

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

  const handleEditInsurance = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('name', insuranceFormData.name)
    formData.append('banner', image)
    formData.append('description', insuranceFormData.description)
    formData.append('insurance_id', insurance?.id)
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
    dispatch(editInsurance(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'insurance/edit/fulfilled') {
          dispatch(getAllInsurances())
          handleClose()
          //   clearFormData()
          notification.success({
            message: 'Insurance updated successfully',
          })
        } else if (response.type === 'insurance/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating insurance, please try again')
      })
  }
  const category_list =
    categories &&
    categories.map((category, key) => {
      return (
        <option
          value={category.id}
          key={key}
          selected={insurance?.category_id == category.id ? true : false}
        >
          {category.name}
        </option>
      )
    })

  const company_list =
    companies &&
    companies.map((company, key) => {
      return (
        <option
          value={company.id}
          key={key}
          selected={insurance?.company_id == company.id ? true : false}
        >
          {company.name}
        </option>
      )
    })

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose} size='lg' backdrop='static'>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit insurance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditInsurance}>
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
                    defaultValue={insuranceFormData.name}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>banner</Form.Label>
                  <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
                  <span>
                    <img
                      src={insurance?.banner}
                      alt='horse'
                      style={{ with: '20px', height: '20px' }}
                    />
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>
                    Insurance policy <span style={{ color: 'red' }}>*</span>
                  </Form.Label>

                  <Form.Select
                    name='insurance_policy'
                    onChange={(evt) => handleInputChange(evt)}
                    defaultValue={insuranceFormData.insurance_policy}
                    required
                  >
                    <option value='price'>Price</option>
                    <option value='percentage'>Percentage</option>
                  </Form.Select>
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
                      value={insuranceFormData.price}
                      required={insuranceFormData.insurance_policy == 'price' ? true : false}
                    />
                    <Form.Control.Feedback type='invalid'>
                      The price field is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>
                      Percentage
                      <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      name='insurance_policy_percentage_value'
                      onChange={(evt) => handleInputChange(evt)}
                      placeholder='Enter percentage value'
                      value={insuranceFormData.insurance_policy_percentage_value}
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
                  <Form.Label>
                    Discount (zero to unset discount)<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type='number'
                    name='discount'
                    onChange={(evt) => handleInputChange(evt)}
                    placeholder='discount'
                    defaultValue={insuranceFormData.discount}
                    disabled={insuranceFormData.insurance_policy == 'price' ? false : true}
                    required
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
                type='text'
                name='description'
                placeholder='description'
                defaultValue={insuranceFormData.description}
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
                defaultValue={insuranceFormData.terms_condition}
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

export default UpdateInsurance
