import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { dashboardService } from "../../services/dashboardService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageHeader } from "antd";
import styled from "styled-components";
import UserTable from "../Users/UserTable";
import { getAllUsers } from "../../redux/userSlice";

const Dashboard = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [dashboardStats, setdashboardStats] = useState();
  useEffect(() => {
    dispatch(getAllUsers());
    getStatistics();
  }, []);


  const getStatistics = () => {
    dashboardService
      .getDashboardStats()
      .then((res) => {
        setdashboardStats(res?.data);
      })
      .catch((error) => {
        console.log("DB error", error);
      });
  };

  console.log("DB res", dashboardStats);


  return (
    <div>
      <PageHeader extra={[]} title="Dashboard" />
      <StyledContainer>
        <CardGroup className="card-group">
          <Card>
            <Card.Body>
              <Card.Title>
                <Link style={{ color: "#FF0303" }} to="/admins">
                  Admins
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.admins}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link style={{ color: "#FF0303" }} to="/bands">
                  Bands
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.bands}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link style={{ color: "#FF0303" }} to="/categories">
                  Categories
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.categories}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link style={{ color: "#FF0303" }} to="/orders">
                  Orders
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.orders}</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup className="card-group">
          <Card>
            <Card.Body>
              <Card.Title className="card-title">
                <Link style={{ color: "#FF0303" }} to="/payments">
                  Payments
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.payments}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link style={{ color: "#FF0303" }} to="products">
                  <Link style={{ color: "#FF0303" }} to="/products">
                    Products
                  </Link>
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.products}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link style={{ color: "#FF0303" }} to="/special-requests">
                  Special requests
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.special_requests}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link style={{ color: "#FF0303" }} to="/users">
                  Users
                </Link>
              </Card.Title>
              <Card.Text>{dashboardStats?.users}</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </StyledContainer>
      <PageHeader extra={[]} title="Users" />
      {users?.data?.users && (
        <UserTable data={users?.data?.users} loading={users?.loading} />
      )}{" "}
    </div>
  );
};

export default Dashboard;
const StyledContainer = styled.div`
  .ant-card-meta {
    align-items: center !important;
  }
  .card-group {
    font-size: 14px;
    font-family: Arial;
    padding-bottom: 20px;
  }
  .card-title {
    font-size: 14px;
    font-family: Arial;
  }
`;
