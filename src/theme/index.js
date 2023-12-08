import { ConfigProvider } from 'antd'

const Theme = () =>
  ConfigProvider.config({
    theme: {
      // primaryColor: '#FAA32C',
      primaryColor: '#004AAD',
    },
  })

export default Theme
