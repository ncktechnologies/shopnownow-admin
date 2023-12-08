import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteLearnerClass, getAllLearnerclasses } from '../../redux/LearnerClassSlice'
import CreatelearnerClass from './CreatelearnerClass'
import LearnerClassTable from './LearnerClassTable'

const Learnerclasses = () => {
  const { learnerClasses } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllLearnerclasses())
    console.log('learnerClasses', learnerClasses)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected learner class?')) {
      return
    }

    dispatch(deleteLearnerClass(id))
      .then((response) => {
        if (response.type === 'learnerclass/delete/fulfilled') {
          dispatch(getAllLearnerclasses())
          notification.success({
            message: ' learnerclass deleted successfully',
          })
        } else if (response.type === 'learnerclass/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting learnerclass, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting learnerclass, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='CreateSubject'>
            <CreatelearnerClass />,
          </Button>,
        ]}
        title='Learner Classes'
      />
      <LearnerClassTable
        data={learnerClasses.data}
        loading={learnerClasses.loading}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Learnerclasses
