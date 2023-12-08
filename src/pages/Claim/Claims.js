import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllClaims, getPaidClaims } from '../../redux/claimSlice'
import StatusTabs from './StatusTabs'

const Claims = () => {
  const { claims } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [paidclaims, setPaidclaims] = useState([])
  const [pendingclaims, setpendingclaims] = useState([])
  const [declinedclaims, setdeclinedclaims] = useState([])

  useEffect(() => {
    dispatch(getAllClaims())
    listPaidClaims()
    listPendingClaims()
    listDeclinedClaims()
  }, [])

  const listPaidClaims = () => {
    setPaidclaims(claims?.data.filter((claim) => claim.status == 'Paid'))
  }

  const listPendingClaims = () => {
    setpendingclaims(claims?.data.filter((claim) => claim.status == 'Pending'))
  }

  const listDeclinedClaims = () => {
    setdeclinedclaims(claims?.data.filter((claim) => claim.status == 'Declined'))
  }

  return (
    <div>
      <PageHeader extra={[]} title='Claims' />
      <StatusTabs
        claims={claims.data}
        paidClaims={paidclaims}
        pendingClaims={pendingclaims}
        declinedClaims={declinedclaims}
      />
    </div>
  )
}

export default Claims
