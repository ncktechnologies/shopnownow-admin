import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'
import { NumericFormat } from 'react-number-format'

const OrderPayment = ({ payment }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-10'>
        <RowDetails label='Reference number' value={payment?.reference_num || 'Null'} />
        <RowDetails
          label='Amount'
          value={
            <NumericFormat
              value={payment?.amount}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₦'}
            />
          }
        />
        <RowDetails label='Customer name' value={payment?.customer_name || 'Null'} />
        <RowDetails label='Customer email' value={payment?.customer_email || 'Null'} />
        <RowDetails label='Payment Type' value={payment?.type || 'Null'} />
        <RowDetails label='Payment origin' value={payment?.origin_of_payment || 'Null'} />

        <RowDetails label='Status' value={payment?.status || 'Null'} />

        <RowDetails
          label='Date Created'
          value={moment(payment?.created_at).format('DD MMM YYYY')}
        />
      </div>
    </StyledContainer>
  )
}

export default OrderPayment

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
