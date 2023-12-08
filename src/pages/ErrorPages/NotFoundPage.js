import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(-1)
  }, [])

  return <div>NotFoundPage</div>
}

export default NotFoundPage
