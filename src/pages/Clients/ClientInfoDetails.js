import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const ClientInfoDetails = ({ singleData }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-4'>
        <RowDetails label='Username' value={singleData?.username || 'Null'} />
        <RowDetails label='ID Status' value={singleData?.id_status || 'Null'} />
        <RowDetails label='Status' value={singleData?.is_online === 0 ? 'Offline': 'Online'} />
        <RowDetails label='Phone number' value={singleData?.phone_number || 'Null'} />
        <RowDetails label='Location' value={singleData?.location || 'Null'} />
        <RowDetails label='Ratings' value={singleData?.ratings || 'Null'} />
        <RowDetails label='User Type' value={singleData?.user_type || 'Null'} />
        <RowDetails label='Wallet' value={singleData?.wallet || 'Null'} />

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

export default ClientInfoDetails

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
