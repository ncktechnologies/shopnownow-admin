import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBanner, getAllBanners } from '../../redux/bannerSlice'
import CreateBanner from './CreateBanner'
import BannerTable from './BannerTable'

const Banners = () => {
  const { banners } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllBanners())
    console.log('banners', banners)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected banner?')) {
      return
    }

    dispatch(deleteBanner(id))
      .then((response) => {
        if (response.type === 'banner/delete/fulfilled') {
          dispatch(getAllBanners())
          notification.success({
            message: 'banner deleted successfully',
          })
        } else if (response.type === 'banner/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting banner, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting banner, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='Creatbanner'>
            <CreateBanner />,
          </Button>,
        ]}
        title='Banners'
      />
      <BannerTable data={banners.data} loading={banners.loading} handleDelete={handleDelete} />
    </div>
  )
}

export default Banners
