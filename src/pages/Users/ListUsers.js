import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/userSlice";
import UserTable from "./UserTable";

const ListUsers = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log("users", users);

  return (
    <div>
      <PageHeader extra={[]} title="Users" />
      {users?.data?.users && (
        <UserTable data={users?.data?.users} loading={users?.loading} />
      )}{" "}
    </div>
  );
};

export default ListUsers;
