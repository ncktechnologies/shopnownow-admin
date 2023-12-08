import React from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import ClientInfoDetails from './ClientInfoDetails'
// import BookingTable from '../Bookings/BookingTable';


const { TabPane } = Tabs

const ClientInfoTab = (props) => {
  const { singleData } = useSelector((state) => state.clients)

  return (
    <div {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Client Info' key='1'>
          <ClientInfoDetails singleData={singleData} />
        </TabPane>
        {/* <TabPane tab='Bookings' key='2'>
          <BookingTable
            parent={'client'}
            loading={false}
            data={singleData?.client_orders}
          />
        </TabPane> */}
      </Tabs>
    </div>
  )
}

export default ClientInfoTab
