import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteLesson, getAllLessons } from '../../redux/lessonSlice'
import CreateLesson from './CreateLesson'
import LessonTable from './LessonTable'
import { getAllInsurances } from '../../redux/InsuranceSlice'

const Lessons = () => {
  const { lessons } = useSelector((state) => state)
  const { insurances } = useSelector((state) => state)

  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllLessons())
    dispatch(getAllInsurances())
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do you want to permanently delete the selected lesson?')) {
      return
    }

    dispatch(deleteLesson(id))
      .then((response) => {
        if (response.type === 'lesson/delete/fulfilled') {
          dispatch(getAllLessons())
          notification.success({
            message: ' lesson deleted successfully',
          })
        } else if (response.type === 'lesson/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting lesson, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting lesson, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='Createlesson'>
            <CreateLesson insurances={insurances} />,
          </Button>,
        ]}
        title='Lessons'
      />
      <LessonTable
        data={lessons.data}
        loading={lessons.loading}
        handleDelete={handleDelete}
        insurances={insurances}
      />
    </div>
  )
}

export default Lessons
