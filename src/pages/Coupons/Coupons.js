import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCoupon, getAllCoupons } from '../../redux/couponSlice'
import CreateCoupon from './CreateCoupon'
import CouponTable from './CouponTable'

const Coupons = () => {
  const { coupon } = useSelector((state) => state)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllCoupons())
  }, [])

  const handleDeleteCoupon = ({ id }) => {

    if (
      !window.confirm("Do You want to permanently delete the selected coupon?")
    ) {
      return;
    }

    dispatch(deleteCoupon(id))
      .then((response) => {
        if (response.type === "coupon/delete/fulfilled") {
          dispatch(getAllCoupons());
          notification.success({
            message: " coupon deleted successfully",
          });
        } else if (response.type === "coupon/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting coupon, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting coupon, please try again later",
        });
      });
  };


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
        handleDelete={handleDeleteCoupon}
      />)}
     
    </div>
  )
}

export default Coupons