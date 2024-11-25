import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllTimeSlots, showTimeSlot, hideTimeSlot, deleteTimeSlot } from '../../redux/timeSlotSlice'
import CreateTimeSlot from './CreateTimeSlot'
import TimeSlotTable from './TimeSlotTable'
import ExpirySession from "../../utils/expirySession";


const TimeSlots = () => {
  const { timeslot } = useSelector((state) => state)
  const dispatch = useDispatch()


  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllTimeSlots())
  }, [])


  console.log(timeslot)

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

          const handleDeleteTimeSlot = ({ id }) => {

            if (
              !window.confirm("Do You want to permanently delete the selected timeslot?")
            ) {
              return;
            }
        
            dispatch(deleteTimeSlot(id))
              .then((response) => {
                if (response.type === "timeSlot/delete/fulfilled") {
                  dispatch(getAllTimeSlots());
                  notification.success({
                    message: " time slot deleted successfully",
                  });
                } else if (response.type === "timeSlot/delete/rejected") {
                  notification.error({
                    message:
                      response?.payload?.message ||
                      "Error deleting time slot, please try again",
                  });
                }
              })
              .catch((error) => {
                notification.error({
                  message: "Error deleting time slot, please try again later",
                });
              });
          };

          const { admin } = ExpirySession.get("user");


  return (
    <div>

      {(admin?.level === 0 || admin?.level === 1 || admin?.level === 2 ) ?  ( <PageHeader
        extra={[
          <Button key='Create time slot' style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateTimeSlot />
          </Button>,
        ]}
        title='Time slots'
      />) :  <PageHeader
      extra={[
      
      ]}
      title='Time slots'
    />}
     

{timeslot?.data?.timeSlots && (<TimeSlotTable
        data={timeslot?.data?.timeSlots}
        loading={timeslot.loading}
        showTimeSlot={handleShowTimeSlot}
        hideTimeSlot={handleHideTimeSlot}
        handleDelete={handleDeleteTimeSlot}
      />)}

      
    </div>
  )
}

export default TimeSlots
