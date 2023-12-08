import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProducts } from '../../redux/productSlice'
import { Link } from 'react-router-dom'
import { deleteOneActivity, getAllActivities } from '../../redux/activitySlice'
import ActivityTable from './ActivityTable'
import CreateGlobalActivity from './CreateGlobalActivity'

const Activities = () => {
  const { serviceCategory } = useSelector((state) => state)
  const { activities } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllActivities())
    console.log('activiies', activities)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected activity?')) {
      return
    }

    dispatch(deleteOneActivity(id))
      .then((response) => {
        if (response.type === 'activity/delete/fulfilled') {
          dispatch(getAllActivities())
          notification.success({
            message: ' activity deleted successfully',
          })
        } else if (response.type === 'activity/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting activity, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting activity, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='createGlobalActivity'>
            <CreateGlobalActivity key='CreateGlobalActivityButton' />,
          </Button>,
        ]}
        title='Activities'
      />
      <ActivityTable
        data={activities.data}
        loading={activities.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Activities
