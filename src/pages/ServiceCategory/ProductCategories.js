import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteServiceCategory, getAllServiceCategory } from '../../redux/serviceCategorySlice'
import CreateCategoryModal from './CreateCategoryModal'
import CategoryDatatable from './CategoryDatatable'

const ProductCategories = () => {
  const { serviceCategory } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected category?')) {
      return
    }

    dispatch(deleteServiceCategory(id))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'serviceCategory/delete/fulfilled') {
          dispatch(getAllServiceCategory())
          notification.success({
            message: ' Category deleted successfully',
          })
        } else if (response.type === 'serviceCategory/delete/rejected') {
          notification.error({
            message:
              response?.payload?.message || 'Error deleting service category, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        notification.error({
          message: 'Error deleting service category, please try again later',
        })
      })
  }

  useEffect(() => {
    dispatch(getAllServiceCategory())
  }, [])

  return (
    <div>
      <PageHeader extra={[<CreateCategoryModal key='createModal' />]} title='Service Categories' />
      <CategoryDatatable categories={serviceCategory?.data} handleDelete={handleDelete} />
    </div>
  )
}

export default ProductCategories
