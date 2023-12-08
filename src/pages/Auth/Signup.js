import { Form, Input, Button, Typography, Row, Col, Space, Avatar } from 'antd'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo192 from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../redux/authSlice'


const Signup = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state?.auth)

  const [error, setError] = useState(null)

  const onFinish = (value) => {
    const first_name = value?.full_name.split(' ')[0]
    const last_name = value?.full_name.split(' ')[1]
    dispatch(signup({ ...value, first_name, last_name })).then((response) => {
      if (response?.payload?.error) {
        setError({ error: true, message: response.payload.message })
      } else if (response?.payload?.error === false) {
        navigate('/dashboard')
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
        <Typography.Title level={2}>Register</Typography.Title>
        <br />
      </div>
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
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
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
            style={{color: '#fff', backgroundColor:'#FF0303'}}
            block
            loading={loading}
          >
            Register{' '}
          </Button>
        </Form.Item>
      </Form>
      {error?.error && <Typography.Text type='danger'>{error?.message}</Typography.Text>}

      <div className='no-account'>
        <Typography.Text className='forgot-password' style={{color: '#FF0303'}}>
          Already have an account?{' '}
          <Typography.Text strong type='link'>
            <Link className='create-account' to='/login' style={{color: '#FF0303'}}>
              Login
            </Link>
          </Typography.Text>
        </Typography.Text>
      </div>
    </LoginContainer>
  )
}

export default Signup

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
    height: 50px;
    width: auto;
    margin: 0 auto;
  }

  @media (min-width: 600px) {
    padding: 3rem;
    width: 500px;
    margin: auto;
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
