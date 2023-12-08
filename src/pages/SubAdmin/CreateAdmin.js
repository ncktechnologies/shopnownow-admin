import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { getAllAdmin } from '../../redux/adminSlice'
import { Form, Input, Button } from 'antd'
import { signup } from '../../redux/authSlice'

function CreateAdmin() {
  const [show, setShow] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state?.auth)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }


  const onFinish = (value) => {
    const first_name = value?.full_name.split(' ')[0]
    const last_name = value?.full_name.split(' ')[1]
    dispatch(signup({ ...value, first_name, last_name })).then((response) => {
      if (response?.payload?.error) {
        setConfirmLoading(false)
        notification.error({
          message: 'Error creating admin, please try again',
        })
      } else if (response?.payload?.error === false) {
        handleClose()
        dispatch(getAllAdmin())
        notification.success({
          message: 'admin created successfully',
        })

        form.resetFields()
      }
    })
  }

  const [confirmLoading, setConfirmLoading] = useState(false)

  return (
    <>
      <span onClick={handleShow}>Add New Admin</span>

      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            requiredMark='optional'
            form={form}
            onFinish={onFinish}
            name='multi-form'
            layout='vertical'
            autoComplete='false'
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your full name',
                },
              ]}
              label='Full Name '
              name='full_name'
            >
              <Input size='large' placeholder='Full name' autoComplete={'off'} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your email address',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}
              label='Email '
              name='email'
            >
              <Input size='large' placeholder='Email' autoComplete={'off'} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone number',
                },
                {
                  message: 'Please enter a valid phone number',
                  min: 5,
                  max: 15,
                },
              ]}
              label='Phone number '
              name='phone_number'
            >
              <Input size='large' placeholder='Phone number' autoComplete={'off'} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
              label='Password '
              name='password'
            >
              <Input autoComplete='off' size='large' type='password' />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your password again',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!'),
                    )
                  },
                }),
              ]}
              label='Confirm Password '
              name='password_confirmation'
            >
              <Input autoComplete='off' size='large' type='password' />
            </Form.Item>
            <Form.Item>
              <Button
                size='large'
                htmlType='submit'
                // onClick={() => setError(null)}
                type='primary'
                block
                loading={loading}
              >
                Add Admin{' '}
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default CreateAdmin
