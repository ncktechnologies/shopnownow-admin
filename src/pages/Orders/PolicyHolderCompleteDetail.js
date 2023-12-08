import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { RowDetails } from '../../components/RowDetails'

const PolicyHolderCompleteDetail = ({ holderCompleteDetail }) => {
  return (
    <StyledContainer>
      <div className='flex flex-col gap-10'>
        <RowDetails
          label='Policy  type'
          value={holderCompleteDetail?.policy_holder_type || 'Null'}
        />
        <RowDetails label='Full Name' value={holderCompleteDetail?.full_name || 'Null'} />
        <RowDetails label='Address' value={holderCompleteDetail?.address || 'Null'} />
        <RowDetails label='occupation' value={holderCompleteDetail?.occupation || 'Null'} />

        <RowDetails
          label='Date of incorporation'
          value={moment(holderCompleteDetail?.date_of_incorporation).format('DD MMM YYYY')}
        />
        <RowDetails
          label='year of purchase'
          value={holderCompleteDetail?.year_of_purchase || 'Null'}
        />
        <RowDetails
          label='Year of manufacture'
          value={holderCompleteDetail?.year_of_manufacture || 'Null'}
        />
        <RowDetails
          label='Vehicle licence'
          value={holderCompleteDetail?.vehicle_licence || 'Null'}
        />
        <RowDetails label='ID type' value={holderCompleteDetail?.id_type || 'Null'} />

        <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
          <strong>KYC:</strong> <br /> <img src={holderCompleteDetail?.kyc} />
        </div>
        <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
          <strong>Utility Bill:</strong> <br />
          <img src={holderCompleteDetail?.utility_bill} />
        </div>
        <div className='flex align-middle items-center gap-4 flex-wrap insuranceprice'>
          <strong>CAC:</strong> <br /> <img src={holderCompleteDetail?.cac} />
        </div>
      </div>
    </StyledContainer>
  )
}

export default PolicyHolderCompleteDetail

const StyledContainer = styled.div`
  .content {
  }
  .divider {
    width: 100%;
    border-color: white;
    opacity: 0.08;
  }
`
