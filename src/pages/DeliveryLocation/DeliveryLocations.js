import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDeliveryLocation, getAllDeliveryLocations } from '../../redux/deliveryLocationSlice'
import CreateDeliveryLocation from './CreateDeliveryLocation'
import DeliveryLocationTable from './DeliveryLocationTable'

const DeliveryLocations = () => {
  const { deliveryLocation } = useSelector((state) => state)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllDeliveryLocations())
  }, [])

  const handleDelete = ({ id }) => {
   
    if (
      !window.confirm("Do You want to permanently delete the selected delivery location?")
    ) {
      return;
    }

    dispatch(deleteDeliveryLocation(id))
      .then((response) => {
        if (response.type === "deliveryLocation/delete/fulfilled") {
          dispatch(getAllDeliveryLocations())
          notification.success({
            message: " Delivery Location deleted successfully",
          });
        } else if (response.type === "deliveryLocation/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting delivery Location, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting delivery location, please try again later",
        });
      });
  };



  return (
    <div>
      <PageHeader
        extra={[
          <Button key='Createcoupon' style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateDeliveryLocation />
          </Button>,
        ]}
        title='Delivery location'
      />

      {deliveryLocation?.data?.locations && ( <DeliveryLocationTable
        data={deliveryLocation?.data?.locations}
        loading={deliveryLocation?.loading}
        handleDelete={handleDelete}
      />)}
     
    </div>
  )
}

export default DeliveryLocations