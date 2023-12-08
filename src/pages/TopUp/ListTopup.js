import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserTable from './TopupTable'
import { getAllTopups } from '../../redux/topupSlice'
import TopupTable from './TopupTable'

const ListTopup = () => {
  const { topup } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllTopups())
  }, [])

  console.log('topup', topup)


  return (
    <div>
      <PageHeader extra={[]} title='Top up' />
      <TopupTable data={topup.data} loading={topup.loading} />
    </div>
  )
}

export default ListTopup
