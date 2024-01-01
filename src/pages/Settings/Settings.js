import { PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../redux/profileSlice'
import ProfileInfo from './ProfileInfo'
import SettingsTabs from './SettingsTabs'


const Settings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [])



  return (
    <div>
      <PageHeader title='Settings' />
      <ProfileInfo />
      <SettingsTabs />
    </div>
  )
}

export default Settings
