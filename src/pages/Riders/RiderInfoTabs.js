import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import OrderTable from '../Orders/OrderTable'
import RiderDocuments from './RiderDocuments'
import MoreDetails from './MoreDetails'
import RiderID from './RiderID'
import RiderChatTable from './RiderChatTable'

const { TabPane } = Tabs

const RiderInfoTabs = ({ rider, orders }) => {

  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Assigned Orders' key='1'>
          <OrderTable data={orders}/>
        </TabPane>
        <TabPane tab='ID' key='2'>
          <RiderID id={rider?.rider_detail}/>
        </TabPane>
        <TabPane tab='Profile Details' key='3'>
          <MoreDetails details = {rider?.rider_detail} />
        </TabPane>
        <TabPane tab='Uploaded Documents' key='4'>
          <RiderDocuments doc={rider?.rider_documents}/>
        </TabPane>
        <TabPane tab='Chat Histories' key='5'>
          <RiderChatTable data={rider?.rider_chats_histories} />

        </TabPane>
      </Tabs>
    </div>
  )
}

export default RiderInfoTabs
