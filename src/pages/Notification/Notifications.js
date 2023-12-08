import React, { useEffect } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotification, getAllNotifications } from '../../redux/notificationSlice'
import CreateEmailNotification from './CreateEmailNotification'
import NotificationTable from './NotificationTable'
import CreatePushNotification from './CreatePushNotification'

const Notifications = () => {
  const { notifications } = useSelector((state) => state)
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getAllNotifications())
  }, [])

  console.log(notifications)


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
          <Button key='CreateEmailNotification'>
            <CreateEmailNotification />
          </Button>,

<Button key='CreatePushNotification'>
<CreatePushNotification />
</Button>
         
        ]}
        title='Notifications'
      />
      <NotificationTable
        data={notifications?.data}
        loading={notifications.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Notifications
