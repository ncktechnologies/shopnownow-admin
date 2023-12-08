import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const { TabPane } = Tabs

const CourseTabs = ({ activities, props }) => {
  const { singleData, loading } = useSelector((state) => state.customers)
  useEffect(() => {
    console.log('activities', activities)
  }, [])

  return (
    <StyledDiv {...props}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Course Content' key='1'>
          {/* <UserActivitiesTable data={activities ? activities : []} loading={false} /> */}
        </TabPane>

        <TabPane tab='Quizzes' key='2'>
          {/* <UserActivitiesTable data={activities ? activities : []} loading={false} /> */}
        </TabPane>

        <TabPane tab='ratings' key='3'>
          {/* <UserActivitiesTable data={activities ? activities : []} loading={false} /> */}
        </TabPane>
        <TabPane tab='payments' key='3'>
          {/* <UserActivitiesTable data={activities ? activities : []} loading={false} /> */}
        </TabPane>
      </Tabs>
    </StyledDiv>
  )
}

export default CourseTabs

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`
