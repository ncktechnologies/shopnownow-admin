import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCoupons } from '../../redux/couponSlice'
import CreateCoupon from './CreateCoupon'
import CouponTable from './CouponTable'

const Coupons = () => {
  const { coupon } = useSelector((state) => state)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllCoupons())
  }, [])


  return (
    <div>
      <PageHeader
        extra={[
          <Button key='Createcoupon' style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateCoupon />
          </Button>,
        ]}
        title='Coupons'
      />

      {coupon?.data?.coupons && ( <CouponTable
        data={coupon?.data?.coupons}
        loading={coupon?.loading}
      />)}
     
    </div>
  )
}

export default Coupons