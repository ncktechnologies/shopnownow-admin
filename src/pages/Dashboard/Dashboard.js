import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { dashboardService } from "../../services/dashboardService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageHeader } from "antd";
import styled from "styled-components";
import { NumericFormat } from 'react-number-format'
import TopSellingTable from "./TopSellingTable";
import TopSellingLocationTable from "./TopSellingLocationTable";
import TotalSalesTable from "./TotalSalesTable";


const Dashboard = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [dashboardStats, setdashboardStats] = useState();
  const [analytics, setAnalytics] = useState();

  useEffect(() => {
    getStatistics();
    getAnalytics()
  }, []);


  const getStatistics = () => {
    dashboardService
      .getDashboardStats()
      .then((res) => {
        setdashboardStats(res?.data);
      })
      .catch((error) => {
      });
  };

  const getAnalytics = () => {
    dashboardService
      .getAnalytics()
      .then((res) => {
        setAnalytics(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("analytics", analytics);


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
      <PageHeader extra={[]} title="Analytics" />
      <StyledContainer>
        <CardGroup className="card-group">
          <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Total revenue today
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.total_revenue_today}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Total revenue this week
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.total_revenue_this_week}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Total revenue this month
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.total_revenue_this_month}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Total revenue over the last 30 days
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.total_revenue_last_30_days}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup className="card-group">
        <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Total revenue over the last 90 days
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.total_revenue_last_90_days}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Total revenue (all time)
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.total_revenue_all_time}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Total revenue (this year)
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.total_revenue_this_year}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <div style={{ color: "#FF0303" }}>
                  Average order value
                </div>
              </Card.Title>
              <Card.Text> <NumericFormat
            value={analytics?.average_order_value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /></Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>

        <PageHeader extra={[]} title="Top selling products" />

        <TopSellingTable
        data={analytics?.top_selling_products}
      />

<PageHeader extra={[]} title="Top selling locations" />

<TopSellingLocationTable
data={analytics?.top_selling_locations}
/>


<PageHeader extra={[]} title="Total sales per product" />

<TotalSalesTable
data={analytics?.total_sales_per_product}
/>
      </StyledContainer>
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
