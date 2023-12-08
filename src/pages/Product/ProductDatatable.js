import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'

import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact'
import moment from 'moment'

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import { Link } from 'react-router-dom'

const ProductDatatable = ({ products, handleDelete }) => {
  useEffect(() => {
    $(document).ready(function () {
      $('#datatable').DataTable()
    })
  }, [products])

  const listproducts =
    products &&
    products.map((product, key) => {
      return (
        <React.Fragment key={key}>
          <tr>
            {/* <td>{key + 1}</td> */}
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{product.individual_price}</td>
            <td>{product.group_price}</td>
            <td>{moment(product.created_at).format('DD MMM YYYY')}</td>

            <td>
              <Button danger onClick={() => handleDelete(product)}>
                delete
              </Button>
              &nbsp;
              <Button>
                <Link to={`/product/edit/${product?.id}/${product?.sku}`}>{'Edit'}</Link>
              </Button>
              &nbsp;
              <Button>
                <Link to={`/product/details/${product?.id}/${product?.sku}`}>{'View'}</Link>
              </Button>
            </td>
          </tr>
        </React.Fragment>
      )
    })

  return (
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <div className='row table-responsive'>
            <table id='datatable' className='display'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Individual Price</th>
                  <th>Group Price</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>{listproducts}</tbody>
            </table>
          </div>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  )
}

export default ProductDatatable
