import React, { useEffect, useState } from 'react'

import { notification, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import InsuranceTable from '../Insurance/InsuranceTable'
import { deleteInsurance, getAllInsurances } from '../../redux/InsuranceSlice'
import { getAllCategories } from '../../redux/categorySlice'
import { getAllCompanies } from '../../redux/companySlice'
import CompanyRatings from './CompanyRatings'

const { TabPane } = Tabs

const CompanyTabs = ({ insurances, ratings }) => {
  const { categories } = useSelector((state) => state)
  const { companies } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllCompanies())
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected insurance?')) {
      return
    }

    dispatch(deleteInsurance(id))
      .then((response) => {
        if (response.type === 'insurance/delete/fulfilled') {
          dispatch(getAllInsurances())
          notification.success({
            message: ' insurance deleted successfully',
          })
        } else if (response.type === 'insurance/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting insurance, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting insurance, please try again later',
        })
      })
  }
  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Insurances' key='1'>
          <InsuranceTable
            data={insurances ? insurances : []}
            loading={false}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>
        <TabPane tab='Ratings' key='2'>
          <CompanyRatings ratings={ratings} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default CompanyTabs
