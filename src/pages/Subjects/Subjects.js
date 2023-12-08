import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSubject, getAllSubjects } from '../../redux/subjectSlice'
import SubjectTable from './SubjectTable'
import CreateSubject from './CreateSubject'

const Subjects = () => {
  const { subjects } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllSubjects())
    console.log('subjects', subjects)
  }, [])

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected subject?')) {
      return
    }

    dispatch(deleteSubject(id))
      .then((response) => {
        if (response.type === 'subject/delete/fulfilled') {
          dispatch(getAllSubjects())
          notification.success({
            message: ' subject deleted successfully',
          })
        } else if (response.type === 'subject/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting subject, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting subject, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='CreateSubject'>
            <CreateSubject />,
          </Button>,
        ]}
        title='Subjects'
      />
      <SubjectTable data={subjects.data} loading={subjects.loading} handleDelete={handleDelete} />
    </div>
  )
}

export default Subjects
