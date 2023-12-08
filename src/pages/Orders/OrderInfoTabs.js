import React from 'react'
import { Tabs } from 'antd'
import ItemTable from './ItemTable'

const { TabPane } = Tabs

const OrderInfoTabs = ({items}) => {

  return (
    <div>
      <Tabs defaultActiveKey='1' style={{color: '#ff0303'}}>
        <TabPane tab='Products' key='1' >
          <ItemTable data={items} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default OrderInfoTabs
