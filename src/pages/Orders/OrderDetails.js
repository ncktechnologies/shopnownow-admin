import { Avatar, Button, Card, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsPhone, BsArrowLeft, BsEnvelope } from "react-icons/bs";
import styled from "styled-components";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";
import { getOneOrder } from "../../redux/orderSlice";
import OrderInfoTabs from "./OrderInfoTabs";
import { notification } from "antd";
import {
  updateStatus,
} from "../../redux/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleData, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneOrder(id));
  }, [id]);


  const [statusData, setStatusData] = useState({
    status: singleData?.order?.status || "pending",
  });
  
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setStatusData({
      ...statusData,
      [name]: value,
    });
  };

  console.log(singleData)

  const handleStatus = (e) => {
    e.preventDefault();
    const data = {
      status: statusData?.status,
      order_id: id,
    };

    dispatch(updateStatus(data))
      .then((response) => {
        console.log(response)
        if (response.type === "order/updateStatus/fulfilled") {
          notification.success({
            message: "order status updated successfully",
          });
          dispatch(getOneOrder(id));
        } else if (response.type === "order/updateStatus/rejected") {
          notification.error({
            message: response?.payload?.message,
          });
          console.log("error notification", response?.payload?.message);
        }
      })
      .catch((error) => {
        notification.error({
          message: "Failed to update status",
        });
      });
  };

  useEffect(() => {
    if (singleData?.order) {
      setStatusData({
        status: singleData.order.status || "pending",
      });
    }
  }, [singleData?.order?.id]);

  

  return (
    <StyledContainer>
     {singleData?.order && ( <div>
        <div className="userInfo">
          <Card
            loading={loading}
            className="userInfo__card"
            title="Order Details"
          >
            <div className={` flex, justify-end`} onClick={() => navigate(-1)}>
              <div to="#" className="userInfo__back">
                <Button
                  style={{ color: "#FF0303" }}
                  icon={<BsArrowLeft />}
                  type="link"
                  className="hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300"
                >
                  Back
                </Button>
              </div>
            </div>

            <Meta
              title={
                <Typography.Title level={2} className="text-3xl m-0 w-full">{`${
                  `${singleData?.order?.order_id}` || ""
                } `}</Typography.Title>
              }
              description={
                <div className="metaDescription">
                   <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Price: </strong>
                    <NumericFormat
                      value={singleData?.order?.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Total price: </strong>
                    <NumericFormat
                      value={singleData?.order?.total_price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Delivery info:</strong>{" "}
                    {singleData?.order?.delivery_info || ""}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Discount applied:</strong>{" "}
                    {singleData?.order?.discount_applied === 1 ?  'Yes': "No"}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Delivery time slot:</strong>{" "}
                    {singleData?.order?.delivery_time_slot || null}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Order status:</strong>{" "}
                    {singleData?.order?.status || "N/A"}
                  </div>

                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Coupon code:</strong>{" "}
                    {singleData?.order?.coupon_code || "N/A"}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Payment type:</strong>{" "}
                    {singleData?.order?.payment_type || "N/A"}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Delivery fee: </strong>
                    <NumericFormat
                      value={singleData?.order?.delivery_fee}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </div>
                 
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Tax : </strong>
                 {singleData?.order?.tax}
                     
                  </div>
                
                 
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Recipient name:</strong>{" "}
                    {singleData?.order?.recipient_name || "N/A"}
                  </div>

                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Recipient email:</strong>{" "}
                    {singleData?.order?.recipient_email || "N/A"}
                  </div>

                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Recipient phone:</strong>{" "}
                    {singleData?.order?.recipient_phone || "N/A"}
                  </div>

                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Scheduled date:</strong>{" "}
                    {singleData?.order?.scheduled_date ? (moment(singleData?.order?.scheduled_date).format("DD MMM YYYY")) : "N/A"}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                    <strong>Created At:</strong>{" "}
                    {singleData?.order?.created_at ? (moment(singleData?.order?.created_at).format("DD MMM YYYY")) : "N/A"}
                  </div>
            
            

                  <div className="mb-3 mt-3">
                    <Form.Group
                      controlId="formBasicStatus"
                      style={{
                        display: "flex",
                        gap: 20,
                        alignItems: "end",
                      }}
                    >
                      <div>
                        <Form.Label>Change Order Status</Form.Label>

                        <Form.Select
                          name="status"
                          onChange={(evt) => handleInputChange(evt)}
                          aria-label="Default select example"
                          defaultValue={singleData?.order?.status}
                        >
                          <option value="paid">Paid</option>
                          <option value="picked">Picked</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="failed">Failed</option>
                        </Form.Select>
                      </div>

                      <Button
                        onClick={handleStatus}
                        size="large"
                        type="submit"
                        style={{ background: "#ff0303", color: "white" }}
                      >
                        Change status
                      </Button>
                    </Form.Group>
                  </div>

         
                </div>
              }
            />
          </Card>

          <OrderInfoTabs
            items={singleData?.products}
          />
        </div>
      </div>)}
      <ToastContainer />
    </StyledContainer>
  );
};

export default OrderDetails;

const StyledContainer = styled.div`
  .ant-card-meta {
    align-items: center !important;
  }

  .metaDescription {
    a {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }

  .userInfo {
    &__back {
      display: flex;
      justify-content: flex-end;
      button {
        display: flex;
        gap: 0.2rem;
        align-items: center;
        transition: all 0.3s;
      }
      button :hover {
        gap: 0.5rem;
      }
    }
  }

  .infoTab {
    margin-top: 1rem;
    padding: 0 0.5rem;
  }
  .insuranceprice {
    margin-top: 5px;
  }
`;
