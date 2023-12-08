import { Avatar, Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
import { getOneUser } from '../../redux/userSlice'
import { Link } from 'react-router-dom'

import {
  HomeOutlined,
  LoadingOutlined,
  StarOutlined,
  CommentOutlined,
  SyncOutlined,
} from '@ant-design/icons'

const CompanyRatings = ({ ratings }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getOneUser(id))
    console.log('insure ratings', ratings)
  }, [id])

  const rating_list =
    ratings &&
    ratings.map((rating, key) => {
      return (
        <Card loading={loading} className='userInfo__card' key={key}>
          <Meta
            avatar={
              <Avatar
                size={100}
                src={rating?.user?.profile_picture || 'https://joeschmoe.io/api/v1/random'}
              />
            }
            title={
              <Typography.Title level={2} className='text-3xl m-0 w-full'>
                <Link to={`/user/details/${rating?.user?.id}/${rating?.user?.email}`}>
                  {'View'}
                  {`${`${rating?.user?.first_name} ${rating?.user?.last_name}` || ''} ${
                    rating?.user?.full_name || ''
                  }`}
                </Link>
              </Typography.Title>
            }
            description={
              <div className='metaDescription'>
                <div className='flex align-middle items-center gap-3 flex-wrap'>
                  <StarOutlined /> {rating?.star_rating_count || 'no phone'}
                </div>

                <div className='flex align-middle items-center gap-3 flex-wrap '>
                  <CommentOutlined /> {rating?.comment || ''}
                </div>
              </div>
            }
          />
        </Card>
      )
    })
  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>{rating_list}</div>
      </div>
    </StyledContainer>
  )
}

export default CompanyRatings

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
