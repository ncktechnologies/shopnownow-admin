import React, { useEffect, useState } from 'react'

import { notification, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllInsurances } from '../../redux/InsuranceSlice'
import LessonTable from '../Lesson/LessonTable'
import { deleteLesson, getAllLessons } from '../../redux/lessonSlice'
import InsuranceRatings from './InsuranceRatings'

const { TabPane } = Tabs

const InsuranceTabs = ({ lessons, ratings }) => {
  const { insurances } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllInsurances())
    console.log('insurance in lesson tabe', insurances)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected lesson?')) {
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
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Lessons' key='1'>
          <LessonTable
            data={lessons ? lessons : []}
            loading={false}
            handleDelete={handleDelete}
            insurances={insurances}
          />
        </TabPane>
        <TabPane tab='Ratings' key='2'>
          <InsuranceRatings ratings={ratings} loading={false} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default InsuranceTabs
