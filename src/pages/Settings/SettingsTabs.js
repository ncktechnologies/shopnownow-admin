import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import styled from "styled-components";

const { TabPane } = Tabs;

const SettingsTabs = (props) => {
  const { singleData } = useSelector((state) => state.clients);

  return (
    <StyledDiv {...props}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Edit Profile" key="1">
          <EditProfile singleData={singleData} />
        </TabPane>
        <TabPane tab="Change Password" key="2">
          <ChangePassword />
        </TabPane>
        <TabPane tab="Referral Discount Settings" key="3">
        </TabPane>
      </Tabs>
    </StyledDiv>
  );
};

export default SettingsTabs;

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`;
