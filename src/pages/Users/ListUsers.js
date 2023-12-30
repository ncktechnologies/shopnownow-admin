import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/userSlice";
import UserTable from "./UserTable";
import DownloadCSVButton from '../../components/DownloadCSVButton'


const ListUsers = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log("users", users);

  const keysToExport = ['name', 'email', 'phone_number', 'created_at'];
  const dateSliceLength = 10; 

  return (
    <div>
      <PageHeader extra={[<DownloadCSVButton data={users?.data?.users} keys={keysToExport} dateSliceLength={dateSliceLength} filename="users_data" />]}title="Users" />
      {users?.data?.users && (
        <UserTable data={users?.data?.users} loading={users?.loading} />
      )}{" "}
    </div>
  );
};

export default ListUsers;
