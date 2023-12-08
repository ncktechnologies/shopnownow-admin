/* eslint-disable */
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Messages {
  successMessage(message, displayPosition) {
    return toast.success(message, {
      position: displayPosition,
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  errorMessage(message, displayPosition) {
    return toast.error(message, {
      position: displayPosition,
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  warningMessage(message, displayPosition) {
    return toast.warning(message, {
      position: displayPosition,
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
}
export default new Messages()
