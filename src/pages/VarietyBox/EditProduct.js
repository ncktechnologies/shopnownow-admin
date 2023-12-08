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
import {
  createRelatedProduct,
  editProduct,
  getAllProducts,
  getOneProduct,
} from '../../redux/productSlice'
import Messages from '../../ToastMessages/Messages'
import { getAllServiceCategory } from '../../redux/serviceCategorySlice'
import { productService } from '../../services/productService'
import { serviceCategoryService } from '../../services/serviceCategory.service'

const initialFormState = {
  name: '',
  category_id: '',
  quantity_instock: '',
  individual_price: '',
  group_price: '',
  featured_image: '',
  description: '',
  product_size: '',
  product_id: '',
}

function EditProduct() {
  const [image, setImage] = useState('')
  const [productFormData, setProductFormData] = useState(initialFormState)
  const { serviceCategory } = useSelector((state) => state)
  const { products } = useSelector((state) => state)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [relatedProducts, setSelatedProducts] = useState(products?.data)
  const [relatedProductformValues, setRelatedProductFormValues] = useState([
    { related_product_id: '' },
  ])
  const [moreImageValues, setMoreImageValues] = useState([{ more_images: '' }])
  const [validated, setValidated] = useState(false)
  const { singleData } = useSelector((state) => state.products)
  const { id, refkey } = useParams()
  const [product, setProduct] = useState('')

  useEffect(() => {
    // dispatch(getAllServiceCategory())
  }, [])

  useEffect(() => {
    // dispatch(getAllProducts())
  }, [])

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

  useEffect(() => {
    // dispatch(getOneProduct(id))
    refreshProduct(id)
    getProductCategories()
  }, [id])

  const refreshProduct = (id) => {
    productService
      .getOne(id)
      .then((response) => {
        console.log('produect resfreshed suceess', response?.data)
        setProduct(response?.data)
        setProductFormData({
          name: response?.data?.name,
          category_id: response?.data?.category_id,
          quantity_instock: response?.data?.quantity_instock,
          individual_price: response?.data?.individual_price,
          group_price: response?.data?.group_price,
          featured_image: response?.data?.featured_image,
          description: response?.data?.description,
          product_size: response?.data?.product_size,
          product_id: response?.data?.id,
        })
      })
      .catch((error) => {
        console.log('produect resfreshed error', error)
      })
  }

  const getProductCategories = () => {
    serviceCategoryService
      .getAll()
      .then((response) => {
        console.log('getProductCategories', response?.data)
        setCategories(response?.data)
      })
      .catch((error) => {
        console.log('getProductCategories error', error)
      })
  }

  const handleEditProduct = (e) => {
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
    formData.append('category_id', productFormData.category_id)
    formData.append('individual_price', productFormData.individual_price)
    formData.append('group_price', productFormData.group_price)
    formData.append('product_size', productFormData.product_size)
    formData.append('description', productFormData.description)
    formData.append('quantity_instock', productFormData.quantity_instock)
    formData.append('productId', productFormData.product_id)
    if (moreImageValues && moreImageValues.length >= 1 && moreImageValues.more_images !== null) {
      formData.append('more_product_images[]', moreImageValues[0]?.more_images)
    }
    if (moreImageValues && moreImageValues.length >= 2) {
      formData.append('more_product_images[]', moreImageValues[1]?.more_images)
    }
    if (moreImageValues && moreImageValues.length >= 3) {
      formData.append('more_product_images[]', moreImageValues[2]?.more_images)
    }
    if (moreImageValues && moreImageValues.length >= 4) {
      formData.append('more_product_images[]', moreImageValues[3]?.more_images)
    }
    if (moreImageValues && moreImageValues.length >= 5) {
      formData.append('more_product_images[]', moreImageValues[4]?.more_images)
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
    // return
    setConfirmLoading(true)
    dispatch(editProduct(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'product/edit/fulfilled') {
          var relatedProductdata = {
            product_id: response?.payload?.id,
            related_productIds: relatedProductformValues,
          }
          if (relatedProductdata?.related_productIds.length >= 1) {
            dispatch(createRelatedProduct(relatedProductdata))
          }
          dispatch(getAllProducts())
          refreshProduct(response?.payload?.id)
          Messages.successMessage('Product updated successfully', 'top-right')
        } else if (response.type === 'product/edit/rejected') {
          console.log('error notificatom', 'Error editing product, please try again')
          console.log('error notificatom', response)

          Messages.errorMessage('Error editing product, please try again', 'top-right')
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error editing product, please try again')
        Messages.errorMessage('Error editing product, please try again', 'top-right')
      })
  }
  const category_list =
    categories &&
    categories.map((category, key) => {
      return (
        <option
          value={category.id}
          key={key}
          selected={product?.category_id === category?.id ? true : false}
        >
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
      let newrelatedProductformValues = [...relatedProductformValues]
      newrelatedProductformValues[i][e.target.name] = e.target.value
      setRelatedProductFormValues(newrelatedProductformValues)

      console.log('multi related products values', relatedProductformValues)
    } else {
      let newrelatedProductformValues = [...relatedProductformValues]
      newrelatedProductformValues[i][e.target.name] = ''
      setRelatedProductFormValues(newrelatedProductformValues)
    }
  }

  let addFormFields = () => {
    if (relatedProductformValues && relatedProductformValues.length == 5) {
      alert("You can't add more than 5 related products")
      return
    }
    setRelatedProductFormValues([...relatedProductformValues, { related_product_id: '' }])
    console.log('multi related products', relatedProductformValues)
  }

  let removeFormFields = (i) => {
    let newrelatedProductformValues = [...relatedProductformValues]
    newrelatedProductformValues.splice(i, 1)
    setRelatedProductFormValues(newrelatedProductformValues)
    console.log('remove multi related products', newrelatedProductformValues)
  }

  let handleMoreImageChange = (i, e) => {
    e.preventDefault()
    if (isNaN(e.target.files[0])) {
      let newMoreImageValues = [...moreImageValues]
      newMoreImageValues[i][e.target.name] = e.target.files[0]
      setMoreImageValues(newMoreImageValues)

      console.log('multi images values', moreImageValues)
    } else {
      let newMoreImageValues = [...moreImageValues]
      newMoreImageValues[i][e.target.name] = ''
      setMoreImageValues(newMoreImageValues)
    }
  }

  let addMoreImageFormFields = (e) => {
    e.preventDefault()

    if (moreImageValues && moreImageValues.length == 5) {
      alert("You can't add more than 5 additional product images")
      return
    }
    setMoreImageValues([...moreImageValues, { more_images: '' }])
    console.log('multi related products', moreImageValues)
  }

  let removeMoreImageFormFields = (i) => {
    let newMoreImageValues = [...moreImageValues]
    newMoreImageValues.splice(i, 1)
    setMoreImageValues(newMoreImageValues)
    console.log('remove multi related products', newMoreImageValues)
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='products' variant='light'>
            <Link to='/products'>Back to list </Link>
          </Button>,
        ]}
        title='Edit Product'
      />

      <Card>
        <Card.Header>
          <small>
            Fields marked with an asterisk (<span style={{ color: 'red' }}>*</span>) are required
          </small>
          <Button className='float-end' variant='light'>
            <Link to={`/product/details/${product?.id}/${product?.sku}`}>{'View details'}</Link>
          </Button>
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleEditProduct}>
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
                    defaultValue={product?.name}
                    placeholder='Product name'
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
                  <Form.Select
                    name='category_id'
                    onChange={(evt) => handleInputChange(evt)}
                    aria-label='Default select example'
                    required
                    // defaultValue={product && product?.category_id}
                  >
                    <option>select category</option>
                    {category_list}
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
                    defaultValue={product?.individual_price}
                    onChange={(evt) => handleInputChange(evt)}
                    placeholder='individual price'
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
                    defaultValue={product?.group_price}
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
                    defaultValue={product?.quantity_instock}
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
                    Product Size <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='product_size'
                    defaultValue={product?.product_size}
                    placeholder='Product Size'
                    onChange={(evt) => handleInputChange(evt)}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    The product Size field is required.
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
                </Form.Group>
                <span>
                  <img
                    src={product?.featured_image}
                    alt='product image'
                    style={{ with: '70px', height: '70px' }}
                  />
                </span>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Description {productFormData.description}</Form.Label>
                  <Form.Control
                    as='textarea'
                    placeholder='Leave a comment here'
                    style={{ height: '100px' }}
                    name='description'
                    defaultValue={product?.description}
                    onChange={(evt) => handleInputChange(evt)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>
                  <strong>Add related products (optional)</strong>
                </h6>

                {relatedProductformValues.map((element, index) => (
                  <div className='form-inline' key={index}>
                    <InputGroup key={index}>
                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Related product {index + 1}</Form.Label>

                        <Form.Select
                          name='related_product_id'
                          value={element.related_product_id || ''}
                          onChange={(e) => handleChange(index, e)}
                          aria-label='Default select example'
                        >
                          <option>Select product</option>
                          {related_products_list}
                        </Form.Select>
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
                  <button className='float-centre' type='button' onClick={() => addFormFields()}>
                    Add More
                  </button>
                </div>
              </Col>
              <Col>
                <h6>
                  <strong>Add More Images (optional except first field)</strong>
                </h6>

                {moreImageValues.map((element, index) => (
                  <div className='form-inline' key={index}>
                    <InputGroup key={index}>
                      <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>
                          image {index + 1}
                          &nbsp;
                          <span style={{ color: 'red' }}>
                            {' '}
                            * &nbsp;
                            {index === 0 ? <small>first field is required</small> : ''}
                          </span>
                        </Form.Label>
                        <Form.Control
                          type='file'
                          name='more_images'
                          onChange={(e) => handleMoreImageChange(index, e)}
                          required={index === 0 ? true : false}
                        />
                      </Form.Group>

                      {index ? (
                        <span
                          className='button remove'
                          onClick={() => removeMoreImageFormFields(index)}
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
                    className='button add mb-3'
                    type='button'
                    onClick={(e) => addMoreImageFormFields(e)}
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
export default EditProduct
