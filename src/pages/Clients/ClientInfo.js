import { Avatar, Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
import ClientInfoTabs from './ClientInfoTabs'
import { getOneClient } from '../../redux/clientSlice'

const ClientInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.clients)

  useEffect(() => {
    dispatch(getOneClient(id))
  }, [id])

  console.log(singleData)

  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card loading={loading} className='userInfo__card'>
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
              avatar={
                <Avatar
                  size={100}
                  src={singleData?.profile_photo_url || 'https://joeschmoe.io/api/v1/random'}
                />
              }
              title={
                <Typography.Title level={2} className='text-3xl m-0 w-full'>{`${
                 `${ singleData?.first_name} ${ singleData?.last_name}` || ''
                } ${singleData?.full_name || ''}`}</Typography.Title>
              }
              description={
                <div className='metaDescription'>
                  {singleData?.phone_number && (
                    <div className='flex align-middle items-center gap-3 flex-wrap'>
                      <a className='text-sm' href={`tel:${singleData?.phone_number}`}>
                        <BsPhone size={15} /> {singleData?.phone_number || 'no phone'}
                      </a>
                    </div>
                  )}
                  <div className='flex align-middle items-center gap-3 flex-wrap '>
                    <a href={`mailto:${singleData?.email}`} className='text-sm'>
                      <BsEnvelope size={15} /> {singleData?.email || ''}
                    </a>
                  </div>
                </div>
              }
            />
          </Card>

          <ClientInfoTabs className='infoTab' />
        </div>
      </div>
    </StyledContainer>
  )
}

export default ClientInfo

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
`
