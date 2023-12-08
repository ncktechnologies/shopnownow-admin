import React, { useEffect, useState } from 'react'

import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact'
import { Button, Table } from 'antd'
import moment from 'moment'

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import UpdateCategoryModal from './UpdateCategoryModal'

const CategoryDatatable = ({ categories, handleDelete }) => {
  useEffect(() => {
    $(document).ready(function () {
      $('#datatable').DataTable()
    })
  }, [categories])

  const listCategories =
    categories &&
    categories.map((category, key) => {
      return (
        <React.Fragment key={key}>
          <tr>
            {/* <td>{key + 1}</td> */}
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>{moment(category.created_at).format('DD MMM YYYY')}</td>

            <td>
              <Button danger onClick={() => handleDelete(category)}>
                {/* <Link to={`/catgory/${category.id}`}>{'delete'}</Link> */}
                delete
              </Button>
              &nbsp;
              {/* <Link to={`/catgory/${category.id}`}>{'Edit'}</Link> */}
              <UpdateCategoryModal category={category} />
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>{listCategories}</tbody>
            </table>
          </div>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  )
}

export default CategoryDatatable
