import React, { useEffect, useState } from 'react'

import { notification, Tabs } from 'antd'
import InsuranceTable from './InsuranceTable'
import { deleteInsurance, getAllInsurances } from '../../redux/InsuranceSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/categorySlice'
import { getAllCompanies } from '../../redux/companySlice'

const { TabPane } = Tabs

const CategoryTabs = ({ insurances, motos, shops, travels, homes, discounted, popular }) => {
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
        <TabPane tab='All' key='1'>
          <InsuranceTable
            data={insurances}
            loading={insurances.loading}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>

        <TabPane tab='Motos' key='2'>
          <InsuranceTable
            data={motos}
            loading={insurances.loading}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>

        <TabPane tab='Shops' key='3'>
          <InsuranceTable
            data={shops}
            loading={insurances.loading}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>

        <TabPane tab='Travels' key='4'>
          <InsuranceTable
            data={travels}
            loading={insurances.loading}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>

        <TabPane tab='Homes' key='5'>
          <InsuranceTable
            data={homes}
            loading={insurances.loading}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>

        <TabPane tab='Discounted' key='6'>
          <InsuranceTable
            data={discounted}
            loading={insurances.loading}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>
        <TabPane tab='Popular (most purchased)' key='7'>
          <InsuranceTable
            data={popular}
            loading={insurances.loading}
            handleDelete={handleDelete}
            categories={categories.data}
            companies={companies.data}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default CategoryTabs
