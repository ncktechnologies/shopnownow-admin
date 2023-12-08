import { lazy } from 'react'

const ServiceProviders = lazy(() => import('./ServiceProviders'))
export const ServiceProviderInfo = lazy(() => import('./ServiceProviderInfo'))

export default ServiceProviders
