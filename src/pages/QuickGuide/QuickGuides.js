import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllQuickGuides, hideShowQuickGuide } from "../../redux/quickGuideSlice";
import CreateQuickGuide from "./CreateQuickGuide";
import QuickGuideTable from "./QuickGuideTable";

const QuickGuides = () => {
  const { quickGuide } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuickGuides());
  }, []);

  const [isChecked, setIsChecked] = useState();


  const handleHideShowQuickGuide = (id) => {
  
    dispatch(hideShowQuickGuide(id))
    .then((response)=> {
      if (response.type === "quickGuide/hideShowQuickGuide/fulfilled") {
        setIsChecked(!isChecked)
        dispatch(getAllQuickGuides());
              notification.success({
                message: " quick guide updated successfully",
              });
            } else if (response.type === "quickGuide/hideShowQuickGuide/rejected") {
              notification.error({
                message:
                  response?.payload?.message ||
                  "Error updating quick guide, please try again",
              });
            }
            
    })
    .catch((error) => {
          notification.error({
            message: "Error deleting quick guide, please try again later",
          });
        });
    
    
      };

  return (
    <div>
      <PageHeader
        extra={[
          <Button key="CreateQuickGuide" style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateQuickGuide />
          </Button>,
        ]}
        title="Quick Guides"
      />

      {quickGuide?.data && (
        <QuickGuideTable data={quickGuide.data} loading={quickGuide.loading} hideShowQuickGuide={handleHideShowQuickGuide}/>
      )}
    </div>
  );
};

export default QuickGuides;
