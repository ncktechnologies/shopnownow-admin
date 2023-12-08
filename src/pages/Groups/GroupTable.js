import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import CountdownTimer from './CountdownTimer'

const GroupTable = ({ data, loading, handleDelete }) => {
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
      title: 'Name',
      dataIndex: 'group_name',
      key: 'group_name',
      ...getColumnSearchProps({
        dataIndex: 'group_name',
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
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (start_date) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {moment(start_date).format('DD MMM YYYY HH:mm A')}
        </span>
      ),
    },
    {
      title: 'Expiring Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (end_date) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {moment(end_date).format('DD MMM YYYY HH:mm A')}
        </span>
      ),
    },

    {
      title: 'Time Left',
      dataIndex: 'end_date',
      key: 'time_left',
      render: (end_date) => <CountdownTimer enddate={+new Date(end_date)} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps({
        dataIndex: 'status',
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
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <Button style={{ marginRight: '5px' }} title='View product details'>
            <Link to={`/group/details/${singleData?.id}`}>{'View details'}</Link>
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

export default GroupTable
