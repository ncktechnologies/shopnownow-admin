import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteQuickGuide,
  getAllQuickGuides,
  hideShowQuickGuide,
} from "../../redux/quickGuideSlice";
import CreateQuickGuide from "./CreateQuickGuide";
import QuickGuideTable from "./QuickGuideTable";
import ExpirySession from "../../utils/expirySession";


const QuickGuides = () => {
  const { quickGuide } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuickGuides());
  }, []);

  const [isChecked, setIsChecked] = useState();

  const handleHideShowQuickGuide = (id) => {
    dispatch(hideShowQuickGuide(id))
      .then((response) => {
        if (response.type === "quickGuide/hideShowQuickGuide/fulfilled") {
          setIsChecked(!isChecked);
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

  const handleDeleteQuickGuide = ({ id }) => {
    if (
      !window.confirm(
        "Do You want to permanently delete the selected quick guide?"
      )
    ) {
      return;
    }

    dispatch(deleteQuickGuide(id))
      .then((response) => {
        if (response.type === "quickGuide/delete/fulfilled") {
          dispatch(getAllQuickGuides());
          notification.success({
            message: " quick guide deleted successfully",
          });
        } else if (response.type === "quickGuide/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting quick guide, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting quick guide, please try again later",
        });
      });
  };

  const { admin } = ExpirySession.get("user");


  return (
    <div>

{admin?.level === 0 || admin?.level === 1 || admin?.level === 2 ? ( <PageHeader
            extra={[
              <Button
                key="CreateQuickGuide"
                style={{ color: "#ff0303", border: "1px solid #ff0303" }}
              >
                <CreateQuickGuide />
              </Button>,
            ]}
            title="Quick Guides"
          />) :  <PageHeader
          extra={[
           
          ]}
          title="Quick Guides"
        /> }

     

      {quickGuide?.data && (
        <QuickGuideTable
          data={quickGuide.data}
          loading={quickGuide.loading}
          hideShowQuickGuide={handleHideShowQuickGuide}
          handleDelete={handleDeleteQuickGuide}
        />
      )}
    </div>
  );
};

export default QuickGuides;
