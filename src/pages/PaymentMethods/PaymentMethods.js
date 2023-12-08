import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import PaymentMethodsTable from './PaymentMethodsTable'
import CreatePaymentMethodModal from './CreatePaymentMethodModal'
import { deletePaymentMethod, getAllPaymentMethods } from '../../redux/paymentMethodSlice'

const PaymentMethods = () => {
  const { paymentMethods } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [modalKey, setModalKey] = useState(1)
  const [editData, setEditData] = useState({})
  const [confirmLoading, setConfirmLoading] = useState(false)

  const setSingleData = (data) => {
    setEditData(data)
    setUpdate(true)
  }

  const handleDelete = ({ id }) => {
    dispatch(deletePaymentMethod(id))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'paymentMethod/delete/fulfilled') {
          dispatch(getAllPaymentMethods())
          notification.success({
            message: ' Payment method deleted successfully',
          })
        } else if (response.type === 'paymentMethod/delete/rejected') {
          notification.error({
            message:
              response?.payload?.message || 'Error deleting payment method, please try again',
          })
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        notification.error({
          message: 'Error deleting payment method, please try again later',
        })
      })
  }

  useEffect(() => {
    setModalKey(modalKey + 1)
    if (showCreateModal === false) {
      setEditData({})
      setUpdate(false)
    }
  }, [showCreateModal])

  useEffect(() => {
    dispatch(getAllPaymentMethods())
  }, [])

  return (
    <div>
      <PageHeader extra={[]} title='Payment Methods' />
      <PaymentMethodsTable
        parent={'payment-method'}
        data={paymentMethods?.data}
        loading={paymentMethods?.loading}
        setSingleData={setSingleData}
        handleVisible={setShowCreateModal}
        handleDelete={handleDelete}
        deleteLoading={confirmLoading}
      />
      <CreatePaymentMethodModal
        key={modalKey}
        visibility={showCreateModal}
        handleVisible={setShowCreateModal}
        update={update}
        singleData={editData}
      />
    </div>
  )
}

export default PaymentMethods
