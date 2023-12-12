import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Menu, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { GrDocumentTime } from 'react-icons/gr'
import { RiUserLine, RiUserHeartLine, RiSettings2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import Logosmall from '../assets/logo.png'

import { toggleCollapseSider } from '../redux/appSlice'
import { AiOutlineLeft } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { BiCategory, BiCreditCard, BiUserPlus, BiWallet, BiBriefcase, BiBook, BiTime, BiData, BiArrowFromLeft, BiLocationPlus, BiBox } from 'react-icons/bi'
import { CgNotes } from 'react-icons/cg'
import {
  DashboardOutlined,
  UnorderedListOutlined,
  ContactsOutlined,
  BorderRightOutlined,
  CommentOutlined,
  SyncOutlined,
  BranchesOutlined,
  BarcodeOutlined,
  NotificationOutlined,
  
} from '@ant-design/icons'

const AppSider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(null)
  const { app } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    items.reduce((acc, curr) => {
      if (location.pathname.includes(curr.key)) {
        setCurrentPage(curr.key)
      }
      return acc
    }, 'appointments')
  }, [location.pathname])

  const toggleSiderCollapse = () => {
    dispatch(toggleCollapseSider())
  }

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    }
  }

  const items = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />),
    getItem('Categories', 'categories', <BiCategory />),
    getItem('Users', 'users', <BiUserPlus size={20} />),
    getItem('Bands', 'bands', <BiBook size={20} />),
    getItem('Coupons', 'coupons', <BarcodeOutlined size={20} />),


    getItem('Products', 'products', <BiBox size={20} />),
    getItem('Orders', 'orders', <UnorderedListOutlined />),

    getItem('Payments', 'payments', <BiWallet size={16} />),
    getItem('Delivery Locations', 'delivery', <BiLocationPlus />),
    getItem('Special Requests', 'special-requests', <CgNotes />),
    getItem('Locations', 'locations', <BiLocationPlus />),
    getItem('Delivery Timeslots', 'time-slots', <BiTime size={16} />),
    getItem('Site Data', 'sitedata', <BiData size={16} />),
    getItem('Quick Guide', 'quickguide', <BiArrowFromLeft size={16} />),
  ]


  const handleMenuClick = (values) => {
    navigate(`/${values.key}`);
    setCurrentPage(values.key); // Update the selected item
  };

  return (
    <>
      <StyledLogo className='logo'>
        {!app.siderCollapsed ? (
          <img style={{ padding: '5px', width: 'auto', height: '80px'}} src={Logo} alt='whoosh' />
        ) : (
          <img style={{ padding: '5px', width: 'auto', height: '80px' }} src={Logosmall} alt='whoosh' />
        )}
  
      </StyledLogo>
      <Menu
        theme='light'
        mode='inline'
        selectedKeys={currentPage ? [currentPage] : []}
        style={{ backgroundColor: '#fff', fontFamily: 'Inter', height: "calc(100vh - 95px)"}}
        onClick={handleMenuClick}
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            style={{
              backgroundColor: currentPage === item.key ? '#FF0303' : 'transparent',
              color: currentPage === item.key ? '#fff' : '#ff0303',
              borderRight: currentPage === item.key ? '#FF0303' : 'transparent',

            }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
      <Button
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          justifyContent: 'center',
          color: '#FF0303',
          backgroundColor:'white',
          border: '1px solid #ff0303'
        }}
        icon={
          <AiOutlineLeft
            style={{ transform: app.siderCollapsed && 'rotate(180deg)' }}
            size={18}
            fill='#FF0303'
            color='#FF0303'
          />
        }
        block
        onClick={toggleSiderCollapse}
      >
        {!app.siderCollapsed && 'Collapse'}
      </Button>
    </>
  )
}

export default AppSider
// background-color: #2e338a;

const StyledLogo = styled.div`
  display: flex;
  color: white;
  align-content: center;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #fff;
  h5 {
    color: white;
  }
`
