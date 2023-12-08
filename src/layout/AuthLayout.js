import React from "react";
import { Layout } from "antd";

import AppSider from "../components/AppSider";
import { useSelector } from "react-redux";
import styled from "styled-components";

const { Sider, Content } = Layout;

const AuthLayout = (props) => {
  const { app } = useSelector((state) => state);
  return (
    <Layout className="h-100">
      <Layout>
        <Content style={{ height: "100vh" }}>
          <FullPageContainer>{props.children}</FullPageContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;

const FullPageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem; ;
`;
