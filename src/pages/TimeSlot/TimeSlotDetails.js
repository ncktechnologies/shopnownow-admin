import { Avatar, Button, Card, Typography, notification } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BsPhone, BsArrowLeft, BsEnvelope } from "react-icons/bs";
import styled from "styled-components";
import moment from "moment";
import { getOneBand } from "../../redux/bandSlice";

const TimeSlotDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleData, loading } = useSelector((state) => state.band);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneBand(id));
  }, [id]);

 

  return (
    <StyledContainer>
      <div>
        <div className="userInfo">
        <Card loading={loading} className='userInfo__card' title='Band Details'>
            <div className={` flex, justify-end`} onClick={() => navigate(-1)}>
              <div to='#' className='userInfo__back'>
                <Button
                  icon={<BsArrowLeft />}
                  type='link'
                  style={{color: '#ff0303'}}
                  className='hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300'
                >
                  Back
                </Button>
              </div>
            </div>
            <Meta
              title={
                <Typography.Title level={2} className='text-3xl m-0 w-full'>{`${
                  `${singleData?.name}` || ''
                } `}</Typography.Title>
              }
              description={
                <div className='metaDescription'>
          
                
            

                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail mt-5'>
                   <strong>{singleData?.description}</strong>
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Discount Enabled:</strong> {singleData?.discount_enabled === 1 ? 'Yes': 'No'}
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>General Discount:</strong> {singleData?.general_discount || "N/A"}
                  </div>

                
                 
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Bulk discount percentage:</strong> {singleData?.bulk_discount_percentage || "N/A"}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Minimum :</strong> {singleData?.minimum}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Created At:</strong>{' '}
                    {moment(singleData.created_at).format('DD MMM YYYY') || ''}
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

export default TimeSlotDetails;

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
