import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import UserInfo from './UserInfo'
import OrderTable from '../Orders/OrderTable'

const { TabPane } = Tabs

const UserInfoTabs = ({ user, orders }) => {

  
  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='User Info' key='1'>
          <UserInfo singleData={user} />
        </TabPane>
        <TabPane tab='Orders' key='2'>
          <OrderTable data={orders} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default UserInfoTabs
