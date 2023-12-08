import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://now.ncktech.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})


export default instance
