import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const ServiceProviderInfoDetails = ({ singleData }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-4'>
        <RowDetails label='My Service' value={singleData?.my_service || 'Null'} />
        <RowDetails label='Phone Number' value={singleData?.phone_number || 'Null'} />
        <RowDetails label='Earnings' value={singleData?.earnings || 'Null'} />
        <RowDetails label='Rating' value={singleData?.star_rating_count || 'Null'} />
        <RowDetails label='Location' value={singleData?.location || 'Null'} />
        <RowDetails label='Social Provider' value={singleData?.social_provider || 'Null'} />
        <RowDetails label='Is Social' value={singleData?.is_social === 0 ? 'True' : 'False'} />
        <RowDetails
          label='Email verified on'
          value={moment(singleData?.email_verified_at).format('DD MMM YYYY')}
        />
        <RowDetails
          label='Account verified on'
          value={moment(singleData?.account_verified_at).format('DD MMM YYYY')}
        />
        <RowDetails
          label='Date Created'
          value={moment(singleData?.created_at).format('DD MMM YYYY')}
        />
      </div>
    </StyledContainer>
  )
}

export default ServiceProviderInfoDetails

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
