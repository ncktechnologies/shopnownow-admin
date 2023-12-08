import { lazy } from 'react'

const Bookings = lazy(() => import('./Bookings'))
const BookingInfo = lazy(() => import('./BookingInfo.js'))

export default Bookings
export { BookingInfo }
