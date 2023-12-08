import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductTabs from './ProductTabs'
import { Button } from 'antd'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { getOneProduct } from '../../redux/productSlice'
import { Link, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { BsArrowLeft } from 'react-icons/bs'

export default function ProductDetails() {
  const { singleData } = useSelector((state) => state.products)
  const { id, refkey } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const relatedproducts = singleData?.related_products?.map((prod, key) => {
    return prod?.product
  })

  useEffect(() => {
    dispatch(getOneProduct(id))
    // console.log('relatedproducts', singleData?.related_products)
  }, [id])

  return (
    <div>
      <Card>
        <Card.Header>
          <div className='pull-left'>Product Details</div>
          <Button className='float-end'>
            <Link to='/product/create' className='float-end'>
              Create Product{' '}
            </Link>
          </Button>
          <Button className='float-end'>
            <Link to={`/product/edit/${singleData?.id}/${singleData?.sku}`}>{'Edit Product'}</Link>
          </Button>
          {/* <Link to='/products'>Back to list </Link> */}
          <div className={` flex, justify-end. float-end`} onClick={() => navigate(-1)}>
            <div to='#' className='userInfo__back  '>
              <Button
                icon={<BsArrowLeft />}
                type='link'
                className='hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300'
              >
                Back
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '65px' }}>RefId:</strong> {singleData?.sku}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '65px' }}>Name:</strong> {singleData?.name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '5px' }}>Individual Price:</strong>{' '}
                      {singleData?.individual_price}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Group Price:</strong>{' '}
                      {singleData?.group_price}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '10px' }}>Quantity in-stock:</strong>{' '}
                      {singleData?.quantity_instock}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Product size:</strong>{' '}
                      {singleData?.product_size}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Category:</strong>{' '}
                      {singleData?.category?.name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Created at:</strong>{' '}
                      {moment(singleData?.created_at).format('DD MMM YYYY')}
                      {/* <CountdownTimer enddate={+new Date(singleData?.created_at)} /> */}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <h2>Featured Image</h2>
              <img
                src={singleData?.featured_image}
                alt='horse'
                width='{40}'
                height='{40}'
                key='{key}'
              />
            </Col>
          </Row>

          <ProductTabs product_Images={singleData?.images} products={relatedproducts} />
        </Card.Body>
      </Card>
    </div>
  )
}
