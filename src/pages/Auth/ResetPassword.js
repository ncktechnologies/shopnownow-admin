import { Form, Input, Button, Typography, Row, Col, Space, Avatar, notification } from 'antd'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo192 from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { resetPassword, sendOTP } from '../../redux/authSlice'

const ResetPassword = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [error, setError] = useState('null')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = (value) => {
    dispatch(resetPassword(value)).then((response) => {
      if (response.type === 'auth/resetPassword/fulfilled') {
        notification.success({ message: 'Password reset successfully' })
        navigate('/login')
      } else if (response.type === 'auth/resetPassword/rejected') {
        setError(response?.payload?.message)
      } else {
        notification.error({ message: 'Error resetting password, please try again later' })
      }
    })
  }

  const resendOTP = (e) => {
    e.preventDefault()
    const email = localStorage.getItem('admin_email')
    const values = { email: email }
    setLoading(true)
    dispatch(sendOTP(values)).then((response) => {
      if (response.type === 'auth/sendOTP/fulfilled') {
        notification.success({ message: 'We have sent another OTP to your email' })
        setLoading(false)
      } else {
        notification.error({ message: 'Error sending OTP, Please try again later' })
        setLoading(false)
      }
    })
  }
  return (
    <LoginContainer>
      <div className='logo'>
      <picture>       
          <img style={{ padding: '5px', width: 'auto', height: '60px' }} src={Logo192} alt='helpa' />
        </picture>
        <Typography.Title style={{ textAlign: 'center' }} level={4}></Typography.Title>
        <Typography.Title level={2}>Reset Password</Typography.Title>
      </div>
      {error && <Typography.Text type='danger'>{error}</Typography.Text>}
      <br />
      <br />
      <Form
        requiredMark='optional'
        form={form}
        onFinish={onFinish}
        name='multi-form'
        layout='vertical'
        autoComplete='false'
        onFieldsChange={() => setError(null)}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please enter the OTP sent to your email address',
            },
            {
              pattern: '^[0-9]+$',
              message: 'OTP must be a number',
            },
          ]}
          label='OTP '
          name='otp'
        >
          <Input size='large' placeholder='OTP' autoComplete={'off'} />
        </Form.Item>
        <Typography.Text type='secondary'>
          {loading ? (
            <span className='mb-50' style={{ fontSize: '16', margin: '120px' }}>
              sending OTP....
            </span>
          ) : (
            <span
              className='mb-50'
              style={{ cursor: 'pointer', fontSize: '16', margin: '100px' }}
              onClick={(e) => resendOTP(e)}
            >
              Didn't get the OTP? Resend
            </span>
          )}
        </Typography.Text>
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
              message: 'Please enter retype your password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
          label='Confirm Password  '
          name='password_confirmation'
        >
          <Input autoComplete='off' size='large' type='password' />
        </Form.Item>

        <Form.Item>
          <Button size='large' htmlType='submit' style={{color: '#fff', backgroundColor:'#FEAE0D'}} block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>

      <div className='no-account'>
        <Typography.Text type='secondary'>
          Go Back to
          <Link className='forgot-password' to='/Login'  style={{color: '#FEAE0D'}}>
            {' '}
            Login
          </Link>
        </Typography.Text>
        {/* <Typography.Text className='forgot-password' type='secondary'>
          Don&#39;t have an account?{' '}
          <Typography.Text strong type='link'>
            <Link className='create-account' to='/create-account'>
              Create Account
            </Link>
          </Typography.Text>
        </Typography.Text> */}
      </div>
    </LoginContainer>
  )
}

export default ResetPassword

const LoginContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  padding: 2rem;
  width: 100%;

  background-color: white;
  border-radius: 0.5rem;

  .logo img {
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 150px;
    margin: 0 auto;
  }

  @media (min-width: 600px) {
    padding: 3rem;
    width: 500px;
  }

  a .forgot-password {
    color: red;
    font-size: 0.75rem;
  }

  .no-account {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;

    a .create-account {
      font-size: 1rem;
      white-space: nowrap;
    }
  }
`
