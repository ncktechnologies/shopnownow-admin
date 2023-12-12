import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toggleCollapseSider, toggleSiderHidden } from '../redux/appSlice'
import { logout } from '../redux/authSlice'
import { RiUserLine, RiUserHeartLine, RiSettings2Line } from 'react-icons/ri'


const AppHeader = () => {
  const dispatch = useDispatch()
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)
  const { siderHidden, siderCollapsed } = useSelector((state) => state.app)

  useEffect(() => {
    function handleResize() {
      setDeviceWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [])

  const adminInfo = localStorage.getItem('user')
  const adminName = JSON.parse(adminInfo)


  useEffect(
    () => {
      // if (deviceWidth <= 640 && siderHidden === false) {
      //   dispatch(toggleSiderHidden())
      // }
      if (deviceWidth < 1024 && deviceWidth > 640 && siderHidden) {
        dispatch(toggleSiderHidden(false))
        dispatch(toggleCollapseSider(true))
      }
      if (deviceWidth < 1024 && !siderCollapsed) {
        dispatch(toggleCollapseSider(true))
      }
      if (deviceWidth >= 1024 && siderCollapsed === true) {
        dispatch(toggleCollapseSider(false))
      }
    },
    // eslint-disable-next-line
    [deviceWidth],
  )

  const navigate = useNavigate()

  return (
    <header
      className='site-layout-background'
      style={{
        display: 'flex',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className='hello'>Hello, {adminName?.value?.admin?.name}</div>
      <div>

      <Button style={{color: '#ff0303', backgroundColor:'#fff', marginRight: '10px', border: '1px solid #ff0303'}}>
        <Link to="setting" style={{color: '#ff0303'}}>
       Settings <RiSettings2Line size={16} />
        </Link>
      </Button>
      <Button style={{color: '#fff', backgroundColor:'#FF0303'}} onClick={() => dispatch(logout())}>
        Logout
      </Button>
      </div>
     
    </header>
  )
}

export default AppHeader
