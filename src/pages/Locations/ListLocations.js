import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideShowLocation, getAllLocations } from "../../redux/locationSlice";
import CreateLocation from "./CreateLocation";
import LocationTable from "./LocationTable";
import ExpirySession from "../../utils/expirySession";


const ListLocations = () => {
  const { location } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLocations());
  }, []);


const [isChecked, setIsChecked] = useState();


  const handleHideShowLocation = (id) => {
  
    dispatch(hideShowLocation(id))
    .then((response)=> {
      if (response.type === "location/hideShowLocation/fulfilled") {
        setIsChecked(!isChecked)
        dispatch(getAllLocations());
              notification.success({
                message: " location updated successfully",
              });
            } else if (response.type === "location/hideShowLocation/rejected") {
              notification.error({
                message:
                  response?.payload?.message ||
                  "Error updating location, please try again",
              });
            }
            
    })
    .catch((error) => {
          notification.error({
            message: "Error deleting location, please try again later",
          });
        });
    
    
      };

      const { admin } = ExpirySession.get("user");


  return (
    <div>
            {admin?.level === 0 || admin?.level === 1 || admin?.level === 2 ? ( <PageHeader
        extra={[
          <Button key="CreateLocations" style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateLocation />
          </Button>,
        ]}
        title="Locations"
      />) :  <PageHeader
      extra={[
   
      ]}
      title="Locations"
    />}

     

      {location?.data && (  <LocationTable
        data={location?.data}
        loading={location.loading}
        hideShowLocation={handleHideShowLocation}
      />)}
    
    </div>
  );
};

export default ListLocations;
