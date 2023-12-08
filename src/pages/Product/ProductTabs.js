import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { deleteProduct, getAllProducts } from '../../redux/productSlice'
import ProductDatatable from './ProductDatatable'
import { useDispatch } from 'react-redux'

import ProductImages from './ProductImages'
import ProductTable from './ProductTable'

function ProductTabs({ product_Images, products }) {
  const dispatch = useDispatch()

  const handleDelete = ({ id }) => {
    // alert('id', id)
    // return
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
    <Tabs defaultActiveKey='image' id='uncontrolled-tab-example' className='mb-3'>
      <Tab eventKey='image' title='Other Images'>
        <ProductImages images={product_Images} />
      </Tab>

      <Tab eventKey='related_products' title='Related products'>
        {products ? (
          // <ProductDatatable products={products} handleDelete={handleDelete} />
          <ProductTable data={products} loading={products.loading} handleDelete={handleDelete} />
        ) : (
          'No related products found'
        )}
      </Tab>
    </Tabs>
  )
}

export default ProductTabs
