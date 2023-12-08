import { Avatar, Table, Button } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const ClientsTable = ({ data, loading }) => {
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
      title: 'Image',
      key: 'client',
      align: 'center',
      render: (client) => (
        <div>
          {client?.profile_photo_url ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={client?.profile_photo_url}
              height={60}
              width={60}
              alt='avatar'
            />
          ) : (
            <Avatar style={{ backgroundColor: '#3f8bcaa1' }} icon={<UserOutlined />} size={50} />
          )}
        </div>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      ...getColumnSearchProps({
        dataIndex: 'first_name',
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
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      ...getColumnSearchProps({
        dataIndex: 'last_name',
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <a style={{ color: 'blue', textDecoration: 'none' }} href={`mailto:${email}`}>
          {email}
        </a>
      ),
    },
    

    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (phone_number) =>
        phone_number ? (
          <a style={{ color: 'blue', textDecoration: 'none' }} href={`tel:${phone_number}`}>
            {phone_number}
          </a>
        ) : (
          'Null'
        ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address) => address || 'Null',
    },
    // {
    //   title: 'Earnings',
    //   dataIndex: 'earnings',
    //   key: 'earnings',
    //   render: (earnings) => `₦${Number(earnings).toLocaleString()}` || 'Null',
    // },
    {
      title: 'Client Type',
      dataIndex: 'user_type',
      key: 'user_type',
    },
    {
      title: 'Stars',
      dataIndex: 'star_rating_count',
      key: 'star_rating_count',
      render: (star_rating_count) => star_rating_count || 'Null',
    },
    // {
    //   title: 'Bookings',
    //   dataIndex: 'client_orders_count',
    //   key: 'client_orders_count',
    // },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },

    {
      title: '',
      key: 'view',
      width: 200,
      align: 'center',
      render: (category) => (
        <div>
             <Button style={{ marginRight: '5px' }} title='View client details'>
              <Link to={`/clients/${category?.id}`}>{'View'}</Link>
            </Button>
        </div>
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

export default ClientsTable
