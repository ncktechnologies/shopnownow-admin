import { Avatar, Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
import moment from 'moment'
import { getOneBanner } from '../../redux/bannerSlice'
import CardGroup from 'react-bootstrap/CardGroup'

const BannerDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.banners)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneBanner(id))
    console.log('single banner', singleData)
  }, [id])

  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card
            loading={loading}
            className='userInfo__card'
            title='Banner Details'
            hoverable
            // style={{ width: 240 }}
            // cover={<img alt='example' src={singleData.banner} />}
          >
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
                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Title:</strong>
                    &nbsp;
                    {singleData?.title || 'no website'}
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>Description:</strong>
                    &nbsp;
                    {singleData?.description || 'no website'}
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap company-detail'>
                    <strong>banner:</strong>

                    <img src={singleData.banner} width='500' height='500' />
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
  )
}

export default BannerDetails

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
