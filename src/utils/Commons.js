/* eslint-disable */
import React from 'react'

class Commons {
  getClaimStatus = (status) => {
    switch (status) {
      case 'Paid':
        return <span className='text-success status'> {status}</span>
        break
      case 'Pending':
        return <span className='text-secondary status'> {status}</span>
        break
      case 'Approved':
        return <span className='text-primary status'> {status}</span>
        break

      case 'Declined':
        return <span className='text-danger status'> {status}</span>
        break
      default:
        break
    }
  }
}
export default new Commons()
