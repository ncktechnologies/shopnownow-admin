import { PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServiceProviders } from '../../redux/serviceProviderSlice'
import ServiceProvidersTable from './ServiceProvidersTable'

const ServiceProviders = () => {
  const { serviceProviders } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllServiceProviders())
  }, [])

  return (
    <div>
      <PageHeader title='Service Providers' />
      <ServiceProvidersTable
        parent={'service-category'}
        data={serviceProviders?.data}
        loading={serviceProviders?.loading}
      />
    </div>
  )
}

export default ServiceProviders
