import { notification, PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatTable from './ChatTable'
import {
  getAllChats,
} from '../../redux/chatSlice'

const Chats = () => {
  const { chat } = useSelector((state) => state)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllChats())
  }, [])

  console.log(chat)

  return (
    <div>
      <PageHeader title='Chats' />
      <ChatTable
        data={chat?.data}
        loading={chat?.loading}
        
      />
    </div>
  )
}

export default Chats
