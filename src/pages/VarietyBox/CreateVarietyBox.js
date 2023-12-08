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
import { createProduct, createRelatedProduct, getAllProducts } from '../../redux/productSlice'
import Messages from '../../ToastMessages/Messages'
import { getAllServiceCategory } from '../../redux/serviceCategorySlice'
import {
  createVarietyBox,
  addItemsToVarietyBox,
  getVarietyBoxCategory,
} from '../../redux/varietyBoxSlice'

const initialFormState = {
  name: '',
  category_id: '',
  quantity_instock: '',
  individual_price: '',
  group_price: '',
  featured_image: '',
  description: '',
  variety_box_size: '',
}

function CreateVarietyBox() {
  const [image, setImage] = useState('')
  const [productFormData, setProductFormData] = useState(initialFormState)
  const { serviceCategory } = useSelector((state) => state)
  const { products } = useSelector((state) => state)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(serviceCategory?.data)
  const [relatedProducts, setSelatedProducts] = useState(products?.data)
  const navigate = useNavigate()
  const [varietyBoxItem, setVarietyBoxItem] = useState([{ product_id: '', quantity: '' }])
  const [validated, setValidated] = useState(false)
  const [variety_box_category, setVarietyBoxCategory] = useState({ id: '', name: '' })

  useEffect(() => {
    dispatch(getAllServiceCategory())
  }, [])

  useEffect(() => {
    dispatch(getAllProducts())
    showVarietyboxCategory()
  }, [])

  const showVarietyboxCategory = () => {
    dispatch(getVarietyBoxCategory())
      .then((response) => {
        if (response.type === 'varietyBox/getCategory/fulfilled') {
          console.log('varity category success response', response?.payload)
          setVarietyBoxCategory({ id: response?.payload?.id, name: response?.payload?.name })
        } else if ('varietyBox/getCategory/rejected') {
          console.log('varity category error response', response)
        }
      })
      .catch((error) => {
        console.log('variety box category', error)
      })
  }

  const onChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setProductFormData({
      ...productFormData,
      [name]: value,
    })
  }

  const clearFormData = () => {
    setProductFormData({
      name: '',
      category_id: '',
      quantity_instock: '',
      individual_price: '',
      group_price: '',
      featured_image: '',
      description: '',
      variety_box_size: '',
    })
    setImage('')
    setVarietyBoxItem([{ product_id: '', quantity: '' }])
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
    formData.append('name', productFormData.name)
    formData.append('image', image)
    formData.append('category_id', variety_box_category?.id)
    formData.append('individual_price', productFormData.individual_price)
    formData.append('group_price', productFormData.group_price)
    formData.append('variety_box_size', productFormData.variety_box_size)
    formData.append('description', productFormData.description)
    formData.append('quantity_instock', productFormData.quantity_instock)

    setConfirmLoading(true)
    dispatch(createVarietyBox(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'varietyBox/create/fulfilled') {
          var varietyBoxdata = {
            variety_box_id: response?.payload?.id,
            products: varietyBoxItem,
          }
          console.log('varietyBoxdata', varietyBoxdata)
          if (varietyBoxdata?.products.length >= 1) {
            dispatch(addItemsToVarietyBox(varietyBoxdata))
          }
          dispatch(getAllProducts())
          console.log('new varietyBox', response)
          clearFormData()
          document.getElementById('create-varietybox-form').reset()
          Messages.successMessage('varietyBox created successfully', 'top-right')
        } else if (response.type === 'varietyBox/create/rejected') {
          console.log('error notificatom', 'Error creating varietyBox, please try again')
          Messages.errorMessage('Error creating varietyBox, please try again', 'top-right')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error creating varietyBox, please try again')
        Messages.errorMessage('Error creating varietyBox, please try again', 'top-right')
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

  const related_products_list =
    relatedProducts &&
    relatedProducts.map((product, key) => {
      return (
        <option value={product.id} key={key}>
          {product.name}
        </option>
      )
    })

  let handleChange = (i, e) => {
    if (!isNaN(e.target.value)) {
      let newvarietyBoxItem = [...varietyBoxItem]
      newvarietyBoxItem[i][e.target.name] = e.target.value
      setVarietyBoxItem(newvarietyBoxItem)

      console.log(' varietyBoxItem values', newvarietyBoxItem)
    } else {
      let newvarietyBoxItem = [...varietyBoxItem]
      newvarietyBoxItem[i][e.target.name] = ''
      setVarietyBoxItem(newvarietyBoxItem)
    }
  }

  let addFormFields = () => {
    if (varietyBoxItem && varietyBoxItem.length == 5) {
      alert("You can't add more than 5 items")
      return
    }
    setVarietyBoxItem([...varietyBoxItem, { product_id: '', quantity: '' }])
    console.log('multi related products', varietyBoxItem)
  }

  let removeFormFields = (i) => {
    let newvarietyBoxItem = [...varietyBoxItem]
    newvarietyBoxItem.splice(i, 1)
    setVarietyBoxItem(newvarietyBoxItem)
    console.log('remove multi related products', newvarietyBoxItem)
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='varietybox' variant='light'>
            <Link to='/variety-boxes'>Back to list </Link>
          </Button>,
        ]}
        title='Create Varietybox'
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
                    Category <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select name='category_id' aria-label='Default select example' required>
                    <option value={variety_box_category?.id}>{variety_box_category?.name}</option>
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
                  <Form.Label>
                    Image <span style={{ color: 'red' }}>*</span> ('jpg,jpeg and png')
                  </Form.Label>
                  <Form.Control type='file' onChange={(evnt) => onChangeImage(evnt)} />
                  <Form.Control.Feedback type='invalid'>
                    The Image field is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Description {productFormData.description}</Form.Label>
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
                  <strong>Add products (items) to variety box</strong>
                </h6>

                {varietyBoxItem.map((element, index) => (
                  <div className='form-inline' key={index}>
                    <InputGroup>
                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Product </Form.Label>

                        <Form.Select
                          name='product_id'
                          value={element.product_id || ''}
                          onChange={(e) => handleChange(index, e)}
                          aria-label='Default select example'
                          required
                        >
                          <option>Select product</option>
                          {related_products_list}
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                          The product field is required.
                        </Form.Control.Feedback>
                      </Form.Group>
                      &nbsp;
                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>
                          {' '}
                          Quantity
                          <span style={{ color: 'gray', marginLeft: '50px' }}>
                            Item {index + 1}
                          </span>
                        </Form.Label>
                        <Form.Control
                          type='number'
                          name='quantity'
                          placeholder='Quantity'
                          value={element.quantity || ''}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                        <Form.Control.Feedback type='invalid'>
                          The quantity field is required.
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
export default CreateVarietyBox
