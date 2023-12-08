import { Button, Col, Form, Input, notification, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile, getProfile } from '../../redux/profileSlice'

const EditProfile = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { singleData } = useSelector((state) => state.profile)

  const handleSubmit = async (values) => {
    setLoading(true)
    dispatch(editProfile(values)).then((response) => {
      if (response.type === 'profile/editProfile/fulfilled') {
        setLoading(false)
        notification.success({ message: 'Profile updated successfully' })
        dispatch(getProfile())
        form.resetFields()
      }
      if (response.type === 'profile/editProfile/rejected') {
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
            label='First Name'
            name='first_name'
            rules={[
              {
                required: true,
                message: 'Please enter your first name',
              },
            ]}
          >
            <Input placeholder='First name' size='large' />
          </Form.Item>
          <Form.Item
            label='Last Name'
            name='last_name'
            rules={[
              {
                message: 'Please enter your last name',
              },
            ]}
          >
            <Input placeholder='Last name' size='large' />
          </Form.Item>
          <Form.Item
            label='Phone number'
            name='phone_number'
            rules={[
              {
                required: true,
                message: 'Please enter your phone number',
              },
              {
                pattern: '^[0-9]+$',
                message: 'Please enter a valid phone number',
              },
            ]}
          >
            <Input placeholder='Last name' size='large' />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              className='btn-reset'
              htmlType='submit'
              style={{color: 'white', backgroundColor: '#FF0303'}}     
              size='large'
            >
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default EditProfile
