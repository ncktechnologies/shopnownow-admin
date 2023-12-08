import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const CourseTable = ({ data, loading, handleDelete }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const columns = [
    {
      title: 'course_title',
      dataIndex: 'course_title',
      key: 'course_title',
      ...getColumnSearchProps({
        dataIndex: 'course_title',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },
    {
      title: 'Fee',
      dataIndex: 'course_fee',
      key: 'course_fee',
      render: (course_fee) => `₦${Number(course_fee).toLocaleString()}` || 'Null',
    },
    {
      title: 'Discount',
      dataIndex: 'course_discount',
      key: 'course_discount',
      ...getColumnSearchProps({
        dataIndex: 'course_discount',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },

    {
      title: 'Total fee',
      dataIndex: 'total_course_fee',
      key: 'total_course_fee',
      render: (total_course_fee) => `₦${Number(total_course_fee).toLocaleString()}` || 'Null',
    },
    {
      title: 'ratings',
      dataIndex: 'ratings_count',
      key: 'ratings_count',
      ...getColumnSearchProps({
        dataIndex: 'ratings_count',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },
    {
      title: 'Quizzes',
      dataIndex: 'quizzes',
      key: 'quizzes',
      render: (quizzes) => <span style={{ whiteSpace: 'nowrap' }}> {quizzes?.length} </span>,
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },

    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <Button style={{ marginRight: '5px' }} title='View product details'>
            <Link to={`/course/details/${singleData?.id}/${singleData?.title_slug}`}>{'View'}</Link>
          </Button>
          <Button style={{ marginRight: '5px' }} title='Edit product'>
            <Link to={`/course/edit/${singleData?.id}/${singleData?.title_slug}`}>Edit</Link>
          </Button>
          <Button danger onClick={() => handleDelete(singleData)} title='Temporarily delete VB'>
            delete
          </Button>
        </>
      ),
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        pagination={data.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default CourseTable
