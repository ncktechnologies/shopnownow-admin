import { notification, PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TransactionsTable from './TransactionsTable'
import {
  approveTransaction,
  declineTransaction,
  getAllTransaction,
} from '../../redux/transactionSlice'

const Transactions = () => {
  const { transactions } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleApprove = ({ id }) => {
    dispatch(approveTransaction(id))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'transactions/approve/fulfilled') {
          dispatch(getAllTransaction())
          notification.success({
            message: ' Transaction approved successfully',
          })
        } else if (response.type === 'transactions/approve/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error approving transaction, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        notification.error({
          message: 'Error approving transaction, please try again later',
        })
      })
  }

  const handleDecline = ({ id }) => {
    dispatch(declineTransaction(id))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'transactions/decline/fulfilled') {
          dispatch(getAllTransaction())
          notification.success({
            message: ' Transaction declined successfully',
          })
        } else if (response.type === 'transactions/decline/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error declining transaction, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        notification.error({
          message: 'Error declining transaction, please try again later',
        })
      })
  }

  useEffect(() => {
    dispatch(getAllTransaction())
  }, [])

  return (
    <div>
      <PageHeader title='Transactions' />
      <TransactionsTable
        parent={'transactions'}
        data={transactions.data}
        loading={transactions.loading}
        handleDecline={handleDecline}
        handleApprove={handleApprove}
        actionLoading={confirmLoading}
      />
    </div>
  )
}

export default Transactions
