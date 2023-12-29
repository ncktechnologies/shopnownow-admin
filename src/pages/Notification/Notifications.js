import React, { useEffect } from "react";
import { Button, notification, PageHeader } from "antd";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  getAllNotifications,
} from "../../redux/notificationSlice";
import SendToOneUser from "./SendToOneUser";
import SendToMultipleUsers from "./SendToMultipleUsers";
import SendToAllUsers from "./SendToAllUsers";

const Notifications = () => {
  const { notifications } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotifications());
  }, []);

  const handleDelete = ({ id }) => {
    if (
      !window.confirm(
        "Do You want to permanently delete the selected notification?"
      )
    ) {
      return;
    }

    dispatch(deleteNotification(id))
      .then((response) => {
        if (response.type === "notification/delete/fulfilled") {
          dispatch(getAllNotifications());
          notification.success({
            message: " notification deleted successfully",
          });
        } else if (response.type === "notification/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting notification, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting notification, please try again later",
        });
      });
  };

  return (
    <div>
      <PageHeader
        extra={[
          <Button key="SendToOne">
            <SendToOneUser />
          </Button>,

          <Button key="SendToAll">
            <SendToAllUsers />
          </Button>,

          <Button key="SendToMultiple">
<SendToMultipleUsers/>
          </Button>
        ]}
        title="Notifications"
      />

      <div style={{ paddingTop: "150px", textAlign: "center" }}>
        <img src={logo} style={{ height: "200px", margin: "auto" }} alt="" />
      </div>
    </div>
  );
};

export default Notifications;
