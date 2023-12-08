import { Avatar, Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
import moment from 'moment'
import { getOneCompany } from '../../redux/companySlice'
import CompanyTabs from './CompanyTabs'

const CompanyDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.companies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneCompany(id))
    console.log('single company', singleData)
  }, [id])

  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card loading={loading} className='userInfo__card' title='Company Details'>
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
              title={
                <Typography.Title level={2} className='text-3xl m-0 w-full'>{`${
                  `${singleData?.name}` || ''
                } `}</Typography.Title>
              }
              description={
                <div className='metaDescription'>
                  {
                    <Avatar
                      size={100}
                      src={singleData?.logo || 'https://joeschmoe.io/api/v1/random'}
                    />
                  }
                  {singleData?.description && (
                    <div className='flex align-middle items-center gap-3 flex-wrap'>
                      <p>{singleData?.description || ''}</p>
                    </div>
                  )}
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Website:</strong>
                    <a className='text-sm' href={`${singleData?.website}`} target='_blank'>
                      {singleData?.website || 'no website'}
                    </a>
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Insurances:</strong> {singleData?.insurances?.length || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Created At:</strong>{' '}
                    {moment(singleData.created_at).format('DD MMM YYYY') || ''}
                  </div>
                </div>
              }
            />
          </Card>

          <CompanyTabs
            insurances={singleData && singleData?.insurances}
            ratings={singleData?.ratings}
          />
        </div>
      </div>
    </StyledContainer>
  )
}

export default CompanyDetails

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
`
