import React from 'react'
import { Layout } from 'antd'

import AppHeader from '../components/AppHeader'
import AppSider from '../components/AppSider'
// import AppFooter from "../components/AppFooter";
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const { Header, Sider, Content } = Layout

const DashboardLayout = (props) => {
  const { app } = useSelector((state) => state)
  return (
    <Layout className='h-100'>
      <Sider
        collapsed={app.siderCollapsed}
        style={{ display: app.siderHidden ? 'none' : 'block', height: '100vh' }}
        className='app-sidebar'
      >
        <AppSider />
      </Sider>
      <Layout>
        <Header className='app-header'>
          <AppHeader />
        </Header>
        <Layout>
          <ContentStyle>{props.children}</ContentStyle>
          {/* <Footer className='app-footer'>
            <AppFooter />
          </Footer> */}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout

const ContentStyle = styled(Content)`
  padding: 0.5rem;
  transition: all 0.3s;
  max-height: calc(100vh - 4.2rem);
  overflow-y: scroll;

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    padding: 1rem;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {
    padding: 2.5rem;
  }

  /* Extra large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {
    padding: 3rem;
  }
`

// 576px for portrait phones.
// 768px for tablets.
// 992px for laptops.
// 1200px for large devices.
