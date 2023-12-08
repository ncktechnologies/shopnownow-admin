import React, { useEffect, useState } from 'react'

import { notification, Tabs } from 'antd'
import ClaimTable from './ClaimTable'

const { TabPane } = Tabs

const StatusTabs = ({ claims, paidClaims, pendingClaims, declinedClaims }) => {
  useEffect(() => {}, [])

  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='All' key='1'>
          <ClaimTable data={claims} loading={claims.loading} />
        </TabPane>

        <TabPane tab='Paid' key='2'>
          <ClaimTable data={paidClaims} loading={claims.loading} />
        </TabPane>

        <TabPane tab='Pending' key='3'>
          <ClaimTable data={pendingClaims} loading={claims.loading} />
        </TabPane>

        <TabPane tab='Declined' key='4'>
          <ClaimTable data={declinedClaims} loading={claims.loading} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default StatusTabs
