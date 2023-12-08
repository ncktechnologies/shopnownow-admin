import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import OrderTable from '../Orders/OrderTable'
import AboutHolder from '../Orders/AboutHolder'

const { TabPane } = Tabs

const CustomerTabs = ({ props, data, loading }) => {
  useEffect(() => {
    console.log('single user', data)
  }, [])

  return (
    <StyledDiv {...props}>
      <Tabs defaultActiveKey='1'>
      <TabPane tab="Customer Details" key="1">
          <AboutHolder customer={data}/>
        </TabPane>
        <TabPane tab='Orders' key='2'>
          <OrderTable
            data={data?.orders}
            loading={loading}

          />
        </TabPane>
      </Tabs>
    </StyledDiv>
  )
}

export default CustomerTabs

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`
