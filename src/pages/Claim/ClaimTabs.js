import React, { useEffect, useState } from 'react'

import { notification, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Proofs from './Proofs'
import UpdateClaimStatus from './UpdateClaimStatus'

const { TabPane } = Tabs

const ClaimTabs = ({ images, claim, handleUpdateClaimStatus, handleInputChange }) => {
  const dispatch = useDispatch()

  useEffect(() => {}, [])

  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Proofs' key='1'>
          <Proofs images={images ? images : []} loading={false} />
        </TabPane>

        <TabPane tab='Update Status' key='2'>
          <UpdateClaimStatus
            claim={claim}
            handleUpdateClaimStatus={handleUpdateClaimStatus}
            handleInputChange={handleInputChange}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ClaimTabs
