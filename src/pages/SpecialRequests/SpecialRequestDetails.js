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
import { getOneSpecialRequest } from "../../redux/specialRequestSlice";
import { notification } from "antd";
import { updateStatus } from "../../redux/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpecialRequestDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleData, loading } = useSelector(
    (state) => state.special_requests
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpecialRequest(id));
  }, [id]);

  console.log(singleData);

  return (
    <StyledContainer>
      {singleData?.request && (
        <div>
          <div className="userInfo">
            <Card
              loading={loading}
              className="userInfo__card"
              title="Special request Details"
            >
              <div
                className={` flex, justify-end`}
                onClick={() => navigate(-1)}
              >
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
                  <Typography.Title
                    level={2}
                    className="text-3xl m-0 w-full"
                  >{`${
                    `${singleData?.request?.request}` || ""
                  } `}</Typography.Title>
                }
                description={
                  <div className="metaDescription">
                    <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                      <strong> {singleData?.request?.comment || ""}</strong>
                    </div>

                    <div className="flex align-middle items-center gap-4 flex-wrap insuranceprice">
                      <strong>Created At:</strong>{" "}
                      {moment(singleData.created_at).format("DD MMM YYYY") ||
                        ""}
                    </div>
                  </div>
                }
              />
            </Card>
          </div>
        </div>
      )}
      <ToastContainer />
    </StyledContainer>
  );
};

export default SpecialRequestDetails;

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
