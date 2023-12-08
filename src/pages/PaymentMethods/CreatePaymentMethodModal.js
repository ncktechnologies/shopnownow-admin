import { Form, Modal, Input, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createPaymentMethod,
  editPaymentMethod,
  getAllPaymentMethods,
} from '../../redux/paymentMethodSlice'

const CreatePaymentMethodModal = ({ visibility, handleVisible, update, singleData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  // form.setFieldValue({ ...singleData });
  const handleOk = () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(false)
        form.submit()
      })
      .catch((info) => {
        setConfirmLoading(false)
      })
  }

  const handleFinish = (values) => {
    setConfirmLoading(true)

    if (update)
      dispatch(editPaymentMethod({ ...values, payment_method_id: singleData?.id }))
        .then((response) => {
          setConfirmLoading(false)
          if (response.type === 'paymentMethod/edit/fulfilled') {
            dispatch(getAllPaymentMethods())
            handleVisible()
            notification.success({
              message: 'Payment method updated successfully',
            })
          } else if (response.type === 'paymentMethod/edit/rejected') {
            handleVisible()
            notification.error({
              message:
                response?.payload?.message || 'Error updating payment method, please try again',
            })
          }
        })
        .catch((error) => {
          setConfirmLoading(false)
          notification.error({
            message: 'Error updating payment method, please try again later',
          })
        })
    else
      dispatch(createPaymentMethod(values))
        .then((response) => {
          setConfirmLoading(false)
          if (response.type === 'paymentMethod/create/fulfilled') {
            dispatch(getAllPaymentMethods())
            handleVisible()
            notification.success({
              message: ' Payment method created successfully',
            })
          } else if (response.type === 'paymentMethod/create/rejected') {
            handleVisible()
            notification.error({
              message:
                response?.payload?.message || 'Error creating payment method, please try again',
            })
          }
        })
        .catch((error) => {
          setConfirmLoading(false)
          notification.error({
            message: 'Error creating payment method, please try again later',
          })
        })
  }

  return (
    <>
      <Modal
        title={`${update ? 'Update' : 'Create'} Payment Method`}
        visible={visibility}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => handleVisible(false)}
        okText={`${update ? 'Update' : 'Create'} Payment Method`}
      >
        <Form
          name='Payment Method'
          layout='vertical'
          onFinish={handleFinish}
          requiredMark='optional'
          form={form}
          initialValues={singleData}
        >
          <Form.Item
            name='name'
            placeholder='Name'
            label='Payment Method Name'
            rules={[
              {
                required: true,
                message: 'Payment method name is required',
              },
            ]}
          >
            <Input size='large' placeholder='Payment method name' />
          </Form.Item>

          <Form.Item
            name='description'
            placeholder='Description'
            label='Description'
            rules={[
              {
                required: true,
                message: 'Description is required',
              },
            ]}
          >
            <Input size='large' placeholder='Description' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreatePaymentMethodModal
