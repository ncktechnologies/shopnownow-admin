import { PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../redux/bookingSlice'
import BookingTable from './BookingTable'

const Bookings = () => {
  const { bookings } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBookings())
  }, [])

  return (
    <div>
      <PageHeader title='Bookings' />
      <BookingTable
        parent={'bookings'}
        data={bookings.data}
        loading={bookings.loading}
      />
    </div>
  )
}

export default Bookings
