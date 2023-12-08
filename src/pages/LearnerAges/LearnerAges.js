import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteLearnerAge, getAllLearnerAges } from '../../redux/LearnerAgeSlice'
import CreatelearnerAge from './CreatelearnerAge'
import LearnerAgeTable from './LearnerAgeTable'

const LearnerAges = () => {
  const { learnerAges } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllLearnerAges())
    console.log('learnerAges', learnerAges)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected learner age?')) {
      return
    }

    dispatch(deleteLearnerAge(id))
      .then((response) => {
        if (response.type === 'learnerage/delete/fulfilled') {
          dispatch(getAllLearnerAges())
          notification.success({
            message: ' learner-age deleted successfully',
          })
        } else if (response.type === 'learnerage/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting learner-age, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting learner-age, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='CreateSubject'>
            <CreatelearnerAge />,
          </Button>,
        ]}
        title='Learner Ages'
      />
      <LearnerAgeTable
        data={learnerAges.data}
        loading={learnerAges.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default LearnerAges
