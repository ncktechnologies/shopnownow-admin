import { Form, Input, Button, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/authSlice'

const Login = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state?.auth)

  const [error, setError] = useState(null)

  const onFinish = (value) => {
    dispatch(login(value)).then((response) => {
      console.log(response)
      if (response?.type === 'auth/login/rejected') {
        setError({ error: true, message: response?.payload?.message })
      } else if (response?.type === 'auth/login/fulfilled') {
        navigate('/dashboard')
      }
    })
  }

  return (
    <LoginContainer>
      <div className='logo'>
        <picture>       
          <img style={{ padding: '5px', width: 'auto', height: '100px' }} src={Logo} alt='helpa' />
        </picture>
        <Typography.Title style={{ textAlign: 'center' }} level={2}></Typography.Title>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Login</Typography.Title>
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
              message: 'Please enter your password',
            },
          ]}
          label='Password '
          name='password'
        >
          <Input autoComplete='off' size='large' type='password' />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} size='large' htmlType='submit' style={{color: '#fff', backgroundColor:'#FF0303'}} block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      {error?.error && <Typography.Text type='danger'>{error?.message}</Typography.Text>}


    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  padding: 2rem;
  width: 100%;
font-family: 'Inter', sans-serif !important;
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
