import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CourseTable from './CourseTable'
import { deleteCourse, getAllCourses } from '../../redux/courseSlice'

const Courses = () => {
  const { courses } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected course?')) {
      return
    }

    dispatch(deleteCourse(id))
      .then((response) => {
        if (response.type === 'course/delete/fulfilled') {
          dispatch(getAllCourses())
          notification.success({
            message: ' Couse deleted successfully',
          })
        } else if (response.type === 'course/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting course, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting course, please try again later',
        })
      })
  }

  useEffect(() => {
    dispatch(getAllCourses())
  }, [])

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='createcourse'>
            <Link to='/course/create'>Create couse </Link>
          </Button>,
        ]}
        title='Courses'
      />
      <CourseTable data={courses.data} loading={courses.loading} handleDelete={handleDelete} />
    </div>
  )
}

export default Courses
