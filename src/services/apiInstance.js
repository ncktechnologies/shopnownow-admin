import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.shopnownow.co/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})


export default instance
