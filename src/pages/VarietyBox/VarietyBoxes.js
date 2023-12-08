import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../redux/productSlice'
import { Link } from 'react-router-dom'
import VarietyBoxTable from './VarietyBoxTable'
import { getAllVarietyBoxes } from '../../redux/varietyBoxSlice'

const VarietyBoxes = () => {
  const { varietyBoxes } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected variety box?')) {
      return
    }

    dispatch(deleteProduct(id))
      .then((response) => {
        if (response.type === 'product/delete/fulfilled') {
          dispatch(getAllVarietyBoxes())
          notification.success({
            message: ' Variety box deleted successfully',
          })
        } else if (response.type === 'product/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting Variety box, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting Variety box, please try again later',
        })
      })
  }

  useEffect(() => {
    dispatch(getAllVarietyBoxes())
  }, [])

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='createVariety'>
            <Link to='/variety-Box/create'>Create Variety Box </Link>
          </Button>,
        ]}
        title='Varitey boxes'
      />
      <VarietyBoxTable
        data={varietyBoxes.data}
        loading={varietyBoxes.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default VarietyBoxes
