import React, { useState, useEffect } from 'react'
import { Avatar, Button, Card, notification, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsPhone, BsArrowLeft, BsEnvelope } from 'react-icons/bs'
import styled from 'styled-components'
import moment from 'moment'
import { getOneClaim, updateClaimStatus } from '../../redux/claimSlice'
import ClaimTabs from './ClaimTabs'
import Commons from '../../utils/Commons'

const initialFormState = {
  status: '',
  claim_id: '',
}
const ClaimDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleData, loading } = useSelector((state) => state.claims)
  const dispatch = useDispatch()
  const [claimFormData, setclaimFormData] = useState(initialFormState)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setclaimFormData({
      ...claimFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    dispatch(getOneClaim(id))
  }, [id])

  const handleUpdateClaimStatus = (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append('status', claimFormData.status)
    formData.append('claim_id', singleData?.id)

    setConfirmLoading(true)
    dispatch(updateClaimStatus(formData))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'claim/edit/fulfilled') {
          dispatch(getOneClaim(id))

          console.log('response act', response)
          notification.success({
            message: 'Claim status updated successfully',
          })
        } else if (response.type === 'claim/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notificatom', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notificatom', 'Error updating claim, please try again')
      })
  }

  return (
    <StyledContainer>
      <div>
        <div className='userInfo'>
          <Card loading={loading} className='userInfo__card' title='Claim Details'>
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
                    <strong>Status:</strong>
                    {Commons.getClaimStatus(singleData?.status)}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Policy Number:</strong> {singleData?.policy_number || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Incident date:</strong>{' '}
                    {moment(singleData.incident_date).format('DD MMM YYYY') || ''}
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Category:</strong> {singleData?.category?.name || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <Link
                      to={`/company/details/${singleData?.company?.id}/${singleData?.company?.slug}`}
                    >
                      <strong style={{ cursor: 'none' }}>Company:</strong>{' '}
                      {singleData?.company?.name || ''}
                    </Link>
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <Link
                      to={`/user/details/${singleData?.user?.id}/${singleData?.user?.first_name}`}
                    >
                      <strong style={{ cursor: 'none' }}>User:</strong>{' '}
                      {singleData?.user?.first_name || ''} {singleData?.user?.last_name || ''}
                    </Link>
                  </div>

                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Created At:</strong>{' '}
                    {moment(singleData.created_at).format('DD MMM YYYY') || ''}
                  </div>
                  <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
                    <strong>Incident Description:</strong> {singleData?.incident_description || ''}
                  </div>
                </div>
              }
            />
          </Card>

          <ClaimTabs
            images={singleData?.claim_image}
            claim={singleData}
            handleUpdateClaimStatus={handleUpdateClaimStatus}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </StyledContainer>
  )
}

export default ClaimDetails

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
  .status {
    font-size: 15px;
  }
`
