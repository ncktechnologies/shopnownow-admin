import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'

export default function Members({ members, loading }) {
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

  useEffect(() => {
    console.log('members', members)
  }, [])

  const columns = [
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
      render: (member) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          <Link to={`/customer/details/${member?.id}`}>
            {member?.first_name} {member?.last_name}
          </Link>
        </span>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'member_type',
      key: 'member_type',
      render: (member_type) => <span style={{ whiteSpace: 'nowrap' }}>{member_type}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'product_quantity',
      key: 'product_quantity',
      render: (product_quantity) => (
        <span style={{ whiteSpace: 'nowrap' }}>{product_quantity}</span>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'product_size',
      key: 'product_size',
      render: (product_size) => <span style={{ whiteSpace: 'nowrap' }}>{product_size}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `₦${Number(total).toLocaleString()}` || 'Null',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {moment(created_at).format('DD MMM YYYY hh:mm A')}
        </span>
      ),
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        pagination={members?.length > 10 ? true : false}
        dataSource={members}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}
