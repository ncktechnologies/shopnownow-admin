import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBands } from "../../redux/bandSlice";
import CreateBand from "./CreateBand";
import BandTable from "./BandTable";
import ExpirySession from "../../utils/expirySession";

const Bands = () => {
  const { band } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllBands());
  }, []);

  const { admin } = ExpirySession.get("user");

  return (
    <div>
      {admin?.level === 0 || admin?.level === 1 || admin?.level === 2 ? (
        <PageHeader
          extra={[
            <Button
              key="Createband"
              style={{ color: "#ff0303", border: "1px solid #ff0303" }}
            >
              <CreateBand />
            </Button>,
          ]}
          title="Bands"
        />
      ) : (
        <PageHeader extra={[]} title="Bands" />
      )}

      <BandTable data={band.data} loading={band.loading} />
    </div>
  );
};

export default Bands;
