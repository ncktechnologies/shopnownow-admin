import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { getOneProduct } from '../../redux/productSlice'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { getOneCourse } from '../../redux/courseSlice'
import CourseTabs from './CourseTabs'

export default function CourseDetail() {
  const { singleData } = useSelector((state) => state.courses)
  const { id, refkey } = useParams()
  const dispatch = useDispatch()

  const coursecontents = singleData?.course_contents?.map((course_content, key) => {
    return course_content
  })

  useEffect(() => {
    dispatch(getOneCourse(id))
  }, [id])

  return (
    <div>
      <Card>
        <Card.Header>
          <div className='pull-left'>Course Details</div>
          <Button className='float-end' variant='light'>
            <Link to='/course/create'>Create Course </Link>
          </Button>
          <Button className='float-end' variant='light'>
            <Link to={`/course/edit/${singleData?.id}/${singleData?.title_slug}`}>{'Edit VB'}</Link>
          </Button>
          <Button className='float-end' variant='light'>
            <Link to='/courses'>Back to list </Link>
          </Button>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '65px' }}>course_title:</strong>{' '}
                      {singleData?.course_title}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '5px' }}>course_fee:</strong> ₦
                      {Number(singleData?.course_fee).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>course_discount:</strong>{' '}
                      {singleData?.course_discount}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>total_course_fee:</strong> ₦
                      {Number(singleData?.total_course_fee).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>read_duration:</strong>{' '}
                      {singleData?.read_duration}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ marginRight: '35px' }}>description:</strong>{' '}
                      {singleData?.description}
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
                      <strong style={{ marginRight: '35px' }}>content_source_url:</strong>{' '}
                      {singleData?.content_source_url}
                      {/* <iframe
                        src={singleData?.content_source_url}
                        frameBorder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title='video'
                      /> */}
                      <div className='video-container'>
                        <video autoPlay muted loop id='video'>
                          <source src={singleData?.content_source_url} type='video/mp4' />
                        </video>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <h2>thumbnail_url</h2>
              <img
                src={singleData?.thumbnail_url}
                alt='horse'
                width='{40}'
                height='{40}'
                key='{key}'
              />
            </Col>
          </Row>

          <CourseTabs />
        </Card.Body>
      </Card>
    </div>
  )
}
