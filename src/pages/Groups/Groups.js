import { Button, PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGroups } from '../../redux/groupSlice'
import GroupTable from './GroupTable'
import { Link } from 'react-router-dom'

export default function Groups() {
  const { groups } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllGroups())
    console.log('groups', groups)
  }, [])
  return (
    <div>
      <PageHeader extra={[]} title='Groups' />
      <GroupTable data={groups.data} loading={groups.loading} />
    </div>
  )
}
