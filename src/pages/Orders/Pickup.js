import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const Pickup = ({ pickup }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-10'>
        <RowDetails label='First name' value={pickup?.first_name || 'Null'} />
        <RowDetails
          label='Last name'
          value={pickup?.last_name || 'Null'}
        />
        <RowDetails label='Phone Number' value={pickup?.phone_number || 'Null'} />
        <RowDetails label='Email address' value={pickup?.email || 'Null'} />
        <RowDetails label='Address' value={pickup?.pickup_address || 'Null'} />
        <RowDetails label='Latitude' value={pickup?.latitude || 'Null'} />
        <RowDetails label='Longitude' value={pickup?.longitude || 'Null'} />
        <RowDetails label='Order id' value={pickup?.order_id || 'Null'} />

        <RowDetails
          label='Date Created'
          value={moment(pickup?.created_at).format('DD MMM YYYY')}
        />
      </div>
    </StyledContainer>
  )
}

export default Pickup

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
