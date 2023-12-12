import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllTimeSlots, showTimeSlot, hideTimeSlot } from '../../redux/timeSlotSlice'
import CreateTimeSlot from './CreateTimeSlot'
import TimeSlotTable from './TimeSlotTable'

const TimeSlots = () => {
  const { timeslot } = useSelector((state) => state)
  const dispatch = useDispatch()


  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllTimeSlots())
  }, [])


  const [checked, setIsChecked] =useState(null)

  const handleShowTimeSlot = (id) => {
  
    dispatch(showTimeSlot(id))
    .then((response)=> {
      if (response.type === "timeSlot/showTimeSlot/fulfilled") {
        setIsChecked(true)
        dispatch(getAllTimeSlots());
              notification.success({
                message: " timeSlot shown successfully",
              });
            } else if (response.type === "timeSlot/showTimeSlot/rejected") {
              notification.error({
                message:
                  response?.payload?.message ||
                  "Error showing time slot, please try again",
              });
            }
            
    })
    .catch((error) => {
          notification.error({
            message: "Error hiding timeSlot, please try again later",
          });
        });
    
    
      };

      const handleHideTimeSlot = (id) => {
  
        dispatch(hideTimeSlot(id))
        .then((response)=> {
          console.log(response)
          if (response.type === "timeSlot/hideTimeSlot/fulfilled") {
            setIsChecked(false)
            dispatch(getAllTimeSlots());
                  notification.success({
                    message: " time slot hidden successfully",
                  });
                } else if (response.type === "timeSlot/hideTimeSlot/rejected") {
                  notification.error({
                    message:
                      response?.payload?.message ||
                      "Error hiding timeSlot, please try again",
                  });
                }
                
        })
        .catch((error) => {
              notification.error({
                message: "Error hiding timeSlot, please try again later",
              });
            });
        
        
          };
  return (
    <div>
      <PageHeader
        extra={[
          <Button key='Create time slot' style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateTimeSlot />
          </Button>,
        ]}
        title='Time slots'
      />

{timeslot?.data?.timeSlots && (<TimeSlotTable
        data={timeslot?.data?.timeSlots}
        loading={timeslot.loading}
        showTimeSlot={handleShowTimeSlot}
        hideTimeSlot={handleHideTimeSlot}
      />)}

      
    </div>
  )
}

export default TimeSlots
