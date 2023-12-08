import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Members from './Members'

function GroupTab({ members }) {
  return (
    <Tabs defaultActiveKey='members' id='uncontrolled-tab-example' className='mb-3'>
      <Tab eventKey='members' title='Members'>
        <Members members={members} />
      </Tab>

      {/* <Tab eventKey='related_products' title='Related products'>
        {products ? (
          <ProductTable data={products} loading={products.loading} handleDelete={handleDelete} />
        ) : (
          'No related products found'
        )}
      </Tab> */}
    </Tabs>
  )
}

export default GroupTab
