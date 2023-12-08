import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductTabs from './VarietyBoxTabs'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { getOneProduct } from '../../redux/productSlice'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { getOneVarietyBox } from '../../redux/varietyBoxSlice'

export default function VarietyBoxDetails() {
  const { singleData } = useSelector((state) => state.varietyBoxes)
  const { id, refkey } = useParams()
  const dispatch = useDispatch()

  const varietyboxproducts = singleData?.variety_products?.map((prod, key) => {
    return prod?.product
  })

  useEffect(() => {
    dispatch(getOneVarietyBox(id))
  }, [id])

  return (
    <div>
      <Card>
        <Card.Header>
          <div className='pull-left'>Variety Box Details</div>
          <Button className='float-end' variant='light'>
            <Link to='/variety-box/create'>Create Variety Box </Link>
          </Button>
          <Button className='float-end' variant='light'>
            <Link to={`/variety-box/edit/${singleData?.id}/${singleData?.sku}`}>{'Edit VB'}</Link>
          </Button>
          <Button className='float-end' variant='light'>
            <Link to='/variety-boxes'>Back to list </Link>
          </Button>
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
                      {singleData?.variety_box_size}
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

          <ProductTabs product_Images={singleData?.images} products={varietyboxproducts} />
        </Card.Body>
      </Card>
    </div>
  )
}
