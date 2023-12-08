import { Button, Col, Form, Input, notification, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../redux/authSlice'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    setLoading(true)
    dispatch(changePassword(values)).then((response) => {
      if (response.type === 'auth/changePassword/fulfilled') {
        setLoading(false)
        notification.success({ message: 'Password successfully changed' })
        form.resetFields()
      }
      if (response.type === 'auth/changePassword/rejected') {
        setLoading(false)
        setError({ message: response?.payload?.message, errors: response?.payload?.errors })
      }
    })
  }

  return (
    <Row>
      <Col sm={24} md={12} lg={9}>
        <Form
          form={form}
          onValuesChange={() => setError(null)}
          onFinish={handleSubmit}
          layout='vertical'
        >
          <Space size='middle' direction='vertical'>
            {error && (
              <Typography.Text type='danger'>
                {error.message}
                {/* {error.errors && Object.keys(error.errors).map((e) => error.errors[e].join(', '))} */}
              </Typography.Text>
            )}
            <span />
          </Space>
          <Form.Item
            label='Current Password'
            name='old_password'
            rules={[
              {
                type: 'password',
                required: true,
                message: 'Please enter your current password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('old_password') !== '') {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Please enter your current password!'))
                },
              }),
            ]}
          >
            <Input placeholder='current password' size='large' type='password' />
          </Form.Item>
          <Form.Item
            label='New Password'
            name='password'
            rules={[
              { required: true, message: 'Please input your new password!', type: 'password' },
            ]}
          >
            <Input size='large' type='password' placeholder='new password' />
          </Form.Item>
          <Form.Item
            label='Confirm New Password'
            name='password_confirmation'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
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
          >
            <Input size='large' type='password' placeholder='new password' />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              className='btn-reset'
              htmlType='submit'
              style={{color: 'white', backgroundColor: '#FF0303'}}              size='large'
            >
              {loading ? 'Loading...' : 'Reset Password'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default ChangePassword
