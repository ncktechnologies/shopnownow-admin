import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompany, getAllCompanies } from '../../redux/companySlice'
import CreateCompany from './CreateCompany'
import CompanyTable from './CompanyTable'

const Companies = () => {
  const { companies } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllCompanies())
    console.log('Companies', companies)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected company?')) {
      return
    }

    dispatch(deleteCompany(id))
      .then((response) => {
        if (response.type === 'company/delete/fulfilled') {
          dispatch(getAllCompanies())
          notification.success({
            message: ' company deleted successfully',
          })
        } else if (response.type === 'company/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting company, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting company, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='CreateCompany'>
            <CreateCompany />,
          </Button>,
        ]}
        title='Companies'
      />
      <CompanyTable data={companies.data} loading={companies.loading} handleDelete={handleDelete} />
    </div>
  )
}

export default Companies
