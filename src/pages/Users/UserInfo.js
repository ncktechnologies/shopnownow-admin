import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const UserInfo = ({ singleData }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-10'>
        <RowDetails label='Name' value={singleData?.name || 'Null'} />
        <RowDetails label='Email' value={singleData?.email || 'Null'} />
        <RowDetails label='Phone Number' value={singleData?.phone_number || 'Null'} />
        <RowDetails label='Status' value={singleData?.verified === 1 ? 'Verified': 'Unverified'} />
        <RowDetails label='Loyalty points' value={singleData?.loyalty_points || 'Null'} />
        <RowDetails label='Wallet' value={`₦ ${singleData?.wallet}`}/>
        <RowDetails
          label='Email verified on'
          value={moment(singleData?.email_verified_at).format('DD MMM YYYY')}
        />

        <RowDetails
          label='Date Created'
          value={moment(singleData?.created_at).format('DD MMM YYYY')}
        />
      </div>
    </StyledContainer>
  )
}

export default UserInfo

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
