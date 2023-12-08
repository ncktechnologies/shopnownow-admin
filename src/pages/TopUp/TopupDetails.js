import { Avatar, Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
import moment from 'moment'

import { NumericFormat } from 'react-number-format'
import { getOneTopup } from '../../redux/topupSlice'

const TopupDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.payments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneTopup(id))
  }, [id])

  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card loading={loading} className='userInfo__card' title='Payment Details'>
            <div className={` flex, justify-end`} onClick={() => navigate(-1)}>
              <div to='#' className='userInfo__back'>
                <Button
                  icon={<BsArrowLeft />}
                  type='link'
                  className='hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300'
                >
                  Back
                </Button>
              </div>
            </div>
            <Meta
              description={
                <div className='metaDescription'>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Reference:</strong> {singleData?.reference || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Amount:</strong>
                    &nbsp;
                    <NumericFormat
                      value={singleData?.amount}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'₦'}
                    />
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Status:</strong> {singleData?.status || 'N/A'}
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong style={{ cursor: 'none' }}>User:</strong>
                    <Link to={`/user/details/${singleData?.user?.id}/${singleData?.user?.email}`}>
                      {singleData?.user?.first_name || ''} {singleData?.user?.last_name || ''}
                    </Link>
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong style={{ cursor: 'none' }}>Order:</strong>
                    <Link
                      to={`/order/details/${singleData?.order?.id}/${singleData?.order?.track_no}`}
                    >
                      <strong>track no.:</strong> {singleData?.order?.track_no || ''}
                    </Link>
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
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
  )
}

export default TopupDetails

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
`
