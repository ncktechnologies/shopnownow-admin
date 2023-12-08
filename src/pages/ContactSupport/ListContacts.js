import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSupports, getOneSupport } from '../../redux/supportSlice'
import ContactsTable from './ContactsTable'

const ListContacts = () => {
  const { contacts } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllSupports())
  }, [])

  console.log('contacts', contacts)


  return (
    <div>
      <PageHeader extra={[]} title='Contact Support' />
      <ContactsTable data={contacts.data} loading={contacts.loading} />
    </div>
  )
}

export default ListContacts
