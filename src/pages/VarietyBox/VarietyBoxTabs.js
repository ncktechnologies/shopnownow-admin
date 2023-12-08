import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { deleteProduct, getAllProducts } from '../../redux/productSlice'
import { useDispatch } from 'react-redux'

import VarietyBoxTable from './VarietyBoxTable'
import ProductTable from '../Product/ProductTable'

function VarietyBoxTabs({ products }) {
  const dispatch = useDispatch()

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected product?')) {
      return
    }

    dispatch(deleteProduct(id))
      .then((response) => {
        if (response.type === 'product/delete/fulfilled') {
          dispatch(getAllProducts())
          notification.success({
            message: ' Product deleted successfully',
          })
        } else if (response.type === 'product/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting product, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting service category, please try again later',
        })
      })
  }
  return (
    <Tabs defaultActiveKey='products' id='uncontrolled-tab-example' className='mb-3'>
      <Tab eventKey='products' title='Products'>
        {products ? (
          <ProductTable data={products} loading={products.loading} handleDelete={handleDelete} />
        ) : (
          'No related products found'
        )}
      </Tab>
    </Tabs>
  )
}

export default VarietyBoxTabs
