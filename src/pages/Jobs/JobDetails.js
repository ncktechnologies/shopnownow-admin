import { Avatar, Button, Card, Typography, notification } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BsPhone, BsArrowLeft, BsEnvelope } from "react-icons/bs";
import styled from "styled-components";
import moment from "moment";
import { getOneJob, featureJob } from "../../redux/jobSlice";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleData, loading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneJob(id));
  }, [id]);

  console.log("single job", singleData);

  const handleFeature = (id ) => {

    if (!window.confirm('Do you want to feature this job?')) {
      return
    }
    dispatch(featureJob(id))
      .then((response) => {
        if (response.type === 'job/feature/fulfilled') {
          notification.success({
            message: ' job featured successfully',
          })
        } else if (response.type === 'job/feature/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error featuring job, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error featuring job, please try again later',
        })
      })
  };

  return (
    <StyledContainer>
      <div>
        <div className="userInfo">
          <Card
            loading={loading}
            className="userInfo__card"
            title="Job Details"
          >
            <div className={` flex, justify-end`} onClick={() => navigate(-1)}>
              <div to="#" className="userInfo__back">
                <Button
                  icon={<BsArrowLeft />}
                  type="link"
                  className="hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300"
                >
                  Back
                </Button>
                <Button
                  className="hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300"
                  onClick={()=>handleFeature(singleData?.id)}
                >
                  {singleData?.is_featured === 'yes' || singleData?.is_featured === null ? 'Unfeature Job' : 'Feature Job'}
                </Button>
              </div>
            </div>
            <Meta
              title={
                <Typography.Title level={2} className="text-3xl m-0 w-full">{`${
                  `${singleData?.headline}` || ""
                } `}</Typography.Title>
              }
              description={
                <div className="metaDescription">
                  {singleData?.description && (
                    <div className="flex align-middle items-center gap-3 flex-wrap">
                      <strong>Description:</strong>
                      <p>{singleData?.description || ""}</p>
                    </div>
                  )}

                  <div className="flex align-middle items-center gap-4 flex-wrap company-detail">
                    <strong>Created At:</strong>{" "}
                    {moment(singleData.created_at).format("DD MMM YYYY") || ""}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap company-detail">
                    <strong>Experience Level:</strong>{" "}
                    {singleData?.experience_level}
                  </div>

                  <div className="flex align-middle items-center gap-4 flex-wrap company-detail">
                    <strong>Delivery Timeline:</strong>{" "}
                    {singleData?.delivery_timeline}
                  </div>

                  <div className="flex align-middle items-center gap-4 flex-wrap company-detail">
                    <strong>Project Status:</strong>{" "}
                    {singleData?.project_status}
                  </div>
                  <div className="flex align-middle items-center gap-4 flex-wrap company-detail">
                    <strong>Job Images:</strong>{" "}
                    {singleData?.job_images?.length === 0 ? (
                      "No Images to show"
                    ) : (
                      <div   style={{
                        display: "flex",
                        wrap: "flex-wrap",
                        gap: "10px",
                      }}>
                        {singleData?.job_images?.map((image, i) => (
                          <div key={i}
                          
                          >
                            <img
                              src={image.image_url}
                              style={{ height: "250px", margin: "auto" }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </StyledContainer>
  );
};

export default JobDetails;

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
  .company-detail {
    margin-top: 5px;
  }
`;
