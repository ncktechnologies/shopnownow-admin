import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotification, getAllNotifications } from '../../redux/notificationSlice'
import CreateNotification from './CreateReport'
import NotificationTable from './ReportTable'

const Notifications = () => {
  const { notifications } = useSelector((state) => state)
  const dispatch = useDispatch()


  console.log(notifications?.data)

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllNotifications())
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected notification?')) {
      return
    }

    dispatch(deleteNotification(id))
      .then((response) => {
        if (response.type === 'notification/delete/fulfilled') {
          dispatch(getAllNotifications())
          notification.success({
            message: ' notification deleted successfully',
          })
        } else if (response.type === 'notification/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting notification, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting notification, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='CreateNotification'>
            <CreateNotification />
          </Button>,
        ]}
        title='Notifications'
      />
      <NotificationTable
        data={notifications.data}
        loading={notifications.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Notifications
