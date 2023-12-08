import { PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClients } from '../../redux/clientSlice';
import ClientsTable from './ClientsTable';

const Patients = () => {
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getAllClients())
  }, [])

  return (
    <div>
      <PageHeader title='Clients' />
      <ClientsTable data={clients.data} loading={clients.loading} />
    </div>
  )
}

export default Patients
