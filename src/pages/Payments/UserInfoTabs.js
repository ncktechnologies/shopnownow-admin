import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import UserInfo from './UserInfo'

const { TabPane } = Tabs

const UserInfoTabs = ({ user }) => {
  //   const { singleData } = useSelector((state) => state.clients)

  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='User Info' key='1'>
          <UserInfo singleData={user} />
        </TabPane>
        <TabPane tab='Orders' key='2'></TabPane>
      </Tabs>
    </div>
  )
}

export default UserInfoTabs
