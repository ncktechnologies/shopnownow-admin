import { PageHeader } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomers } from '../../redux/customerSlice'
import CustomerTable from './CustomerTable'

function Customers() {
  const { customers } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCustomers())
    console.log('customers', customers)
  }, [])
  return (
    <div>
      <PageHeader extra={[]} title='Customers' />
      <CustomerTable data={customers.data} loading={customers.loading} />
    </div>
  )
}
export default Customers
