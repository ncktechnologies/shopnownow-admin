import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllSettings } from "../../redux/settingsSlice";
import CreateSetting from "./CreateSetting";
import SettingsTable from "./SettingsTable";
import ExpirySession from "../../utils/expirySession";

const Setting = () => {
  const { settings } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSettings());
  }, []);

  const { admin } = ExpirySession.get("user");

  return (
    <div>
      {admin?.level === 0 || admin?.level === 1 || admin?.level === 2 ? (
        <PageHeader
          extra={[
            <Button
              key="Createsettings"
              style={{ color: "#ff0303", border: "1px solid #ff0303" }}
            >
              <CreateSetting />
            </Button>,
          ]}
          title="Settings"
        />
      ) : (
        <PageHeader extra={[]} title="Settings" />
      )}

      {settings?.data?.settings && (
        <SettingsTable
          data={settings?.data?.settings}
          loading={settings.loading}
        />
      )}
    </div>
  );
};

export default Setting;
