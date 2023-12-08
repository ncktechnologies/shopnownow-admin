import { notification, PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WalletTable from './WalletTable'
import {
  declineWithdrawalRequest,
  approveWithdrawalRequest,
  getAllWallet,
} from '../../redux/walletSlice'

const Wallet = () => {
  const { wallet } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleApprove = ({ id }) => {
    dispatch(approveWithdrawalRequest(id))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'wallet/transaction/fulfilled') {
          dispatch(getAllWallet())
          notification.success({
            message: ' Transaction approved successfully',
          })
        } else if (response.type === 'wallet/approve/rejected') {
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
    dispatch(declineWithdrawalRequest(id))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'wallet/decline/fulfilled') {
          dispatch(getAllWallet())
          notification.success({
            message: ' Transaction declined successfully',
          })
        } else if (response.type === 'wallet/decline/rejected') {
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
    dispatch(getAllWallet())
  }, [])

  console.log(wallet)

  return (
    <div>
      <PageHeader title='Wallet' />
      <WalletTable
        parent={'wallet'}
        data={wallet.data}
        loading={wallet.loading}
        handleDecline={handleDecline}
        handleApprove={handleApprove}
        actionLoading={confirmLoading}
      />
    </div>
  )
}

export default Wallet
