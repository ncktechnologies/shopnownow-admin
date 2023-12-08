import React, { useEffect } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdmin, getAllAdmin } from '../../redux/adminSlice'
import AdminTable from './AdminTable'
import CreateAdmin from './CreateAdmin'

const ListPickupCharges = () => {
  const { admin } = useSelector((state) => state)
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getAllAdmin())
  }, [])

  console.log(admin)


  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected admin?')) {
      return
    }

    dispatch(deleteAdmin(id))
      .then((response) => {

        console.log(id)
        if (response.type === 'notification/delete/fulfilled') {
          console.log(response)
          dispatch(getAllAdmin())
          notification.success({
            message: ' admin deleted successfully',
          })
        } else if (response.type === 'notification/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting admin, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting admin, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
<Button key='CreateAdmin'>
<CreateAdmin/>
</Button>
         
        ]}
        title='Admins'
      />
      <AdminTable
        data={admin?.data}
        loading={admin.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default ListPickupCharges
