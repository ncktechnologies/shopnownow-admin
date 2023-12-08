import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRiders } from "../../redux/riderSlice";
import RiderTable from "./RiderTable";
import CreateRider from "./CreateRider";

const ListRiders = (props) => {
  const { rider } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllRiders());
  }, []);

  console.log(rider)

  return (
    <div>
      <PageHeader
        extra={[
          <Button key="CreateRider">
            <CreateRider />
          </Button>
        ]}
        title="Riders"
      />

      <RiderTable data={rider.data} loading={rider.loading} />
    </div>
  );
};

export default ListRiders;
