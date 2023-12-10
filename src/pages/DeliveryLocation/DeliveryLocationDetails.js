import { Avatar, Button, Card, Typography, notification } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BsPhone, BsArrowLeft, BsEnvelope } from "react-icons/bs";
import styled from "styled-components";
import moment from "moment";
import { getOneDeliveryLocation } from "../../redux/deliveryLocationSlice";
import { NumericFormat } from 'react-number-format'
import { getAllBands } from "../../redux/bandSlice";



const DeliveryLocationDetails = () => {


  const { band } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllBands());
  }, []);


  const navigate = useNavigate();
  const { id } = useParams();
  const { singleData, loading } = useSelector((state) => state.deliveryLocation);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getOneDeliveryLocation(id));
  }, [id]);

  const bandName = band?.data?.filter((b)=> b.id === singleData?.location?.band_id)


  return (
    <StyledContainer>
      <div>
        <div className="userInfo">
      {singleData?.location && (  <Card loading={loading} className='userInfo__card' title='Delivery location Details'>
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
                  `${singleData?.location.location}` || ''
                } `}</Typography.Title>
              }
              description={
                <div className='metaDescription'>
    
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Price:</strong>
                    &nbsp;
                    <NumericFormat
                      value={singleData?.location.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'₦'}
                    />
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Band:</strong> {bandName[0]?.name}
                  </div>
               
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Created At:</strong>{' '}
                    {moment(singleData.created_at).format('DD MMM YYYY') || ''}
                  </div>
                </div>
              }
            />
          </Card>)}
        </div>
      </div>
    </StyledContainer>
  );
};

export default DeliveryLocationDetails;

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
