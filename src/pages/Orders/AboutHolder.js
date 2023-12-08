import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'
import { NumericFormat } from 'react-number-format'


const Aboutcustomer = ({ customer }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-10'>
        <RowDetails label='Wallet Balance' value={ <span style={{ whiteSpace: 'nowrap' }}>
          <NumericFormat
            value={customer?.wallet}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        </span>|| 'Null'} />
        <RowDetails label='Full Name' value={customer?.full_name || 'Null'} />
        <RowDetails label='Email' value={customer?.email || 'Null'} />
        <RowDetails label='Phone number' value={customer?.phone_number || 'Null'} />
        <RowDetails label='Status' value={customer?.status || 'Null'} />
        <RowDetails label='Address' value={customer?.address || 'Null'} />
        <RowDetails label='Blocked' value={customer?.is_blocked === 1 ? 'Yes' :'No'} />
        <RowDetails label='Online' value={customer?.is_online === 1 ? 'Yes' :'No'} />

        <RowDetails label='Date Created' value={moment(customer?.created_at).format('DD MMM YYYY')} />
      </div>
    </StyledContainer>
  )
}

export default Aboutcustomer

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
