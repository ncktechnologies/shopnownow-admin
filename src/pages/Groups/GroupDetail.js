import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import ProductTabs from './ProductTabs'
import { Button } from 'antd'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { getOneGroup } from '../../redux/groupSlice'
import CountdownTimer from './CountdownTimer'
import GroupTab from './GroupTab'
import { BsArrowLeft } from 'react-icons/bs'

export default function GroupDetail() {
  const { singleData } = useSelector((state) => state.groups)
  const { id, refkey } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //   const relatedproducts = singleData?.related_products?.map((prod, key) => {
  //     return prod?.product
  //   })

  useEffect(() => {
    dispatch(getOneGroup(id))
    // console.log('relatedproducts', singleData?.related_products)
  }, [id])

  return (
    <div>
      <Card>
        <div className={` flex, justify-end`} onClick={() => navigate(-1)}>
          <div to='#' className='userInfo__back  float-end'>
            <Button
              icon={<BsArrowLeft />}
              type='link'
              className='hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300'
            >
              Back
            </Button>
          </div>
        </div>
        <Card.Header>
          <div className='pull-left'>Group Details</div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '65px' }}>Name:</strong>{' '}
                      {singleData?.group_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '20px' }}>Start Date:</strong>{' '}
                      {moment(singleData?.start_date).format('DD MMM YYYY hh:mm A')}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '25px' }}>Expiring Date:</strong>{' '}
                      {moment(singleData?.end_date).format('DD MMM YYYY hh:mm A')}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '50px' }}>Time Left:</strong>
                      <CountdownTimer enddate={+new Date(singleData?.end_date)} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Status:</strong> {singleData?.status}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Created by (Admin):</strong>{' '}
                      <Link to={`/customer/details/${singleData?.admin?.id}`}>
                        {singleData?.admin?.first_name} {singleData?.admin?.last_name}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Product:</strong>{' '}
                      {singleData?.product?.type === 'prduct' ? (
                        <Link
                          to={`/product/details/${singleData?.product?.id}/${singleData?.product?.sku}`}
                        >
                          {singleData?.product?.name}
                        </Link>
                      ) : (
                        <Link
                          to={`/variety-box/details/${singleData?.product?.id}/${singleData?.product?.sku}`}
                        >
                          {singleData?.product?.name}
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Created at:</strong>{' '}
                      {moment(singleData?.created_at).format('DD MMM YYYY')}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>Members Count:</strong>{' '}
                      {singleData?.members?.length} members
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <GroupTab members={singleData?.members} loading={false} />
        </Card.Body>
      </Card>
    </div>
  )
}
