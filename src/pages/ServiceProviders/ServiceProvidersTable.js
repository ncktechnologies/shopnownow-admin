import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import { UserOutlined } from '@ant-design/icons'
import MenuDivider from 'antd/lib/menu/MenuDivider'

const ServiceProvidersTable = ({
  data,
  loading,
  setSingleData,
  setUpdate,
  handleVisible,
  handleDelete,
  deleteLoading,
}) => {
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
      key: 'serviceProvider',
      align: 'center',
      render: (serviceProvider) => (
        <div>
          {serviceProvider?.profile_photo_url ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={serviceProvider?.profile_photo_url}
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
      width: 150,
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
      width: 150,
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
      dataIndex: 'location',
      key: 'location',
      render: (location) => location || 'Null',
    },
    {
      title: 'Services',
      dataIndex: 'my_service',
      key: 'my_service',
      render: (my_service) => (Array.isArray(my_service) && my_service.length) || 0,
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (description) => description || 'Null',
    // },
    // {
    //   title: 'Earnings',
    //   dataIndex: 'earnings',
    //   key: 'earnings',
    //   render: (earnings) => `₦${Number(earnings).toLocaleString()}` || 'Null',
    // },
    {
      title: 'Reviews',
      dataIndex: 'provider_ratings_count',
      key: 'provider_ratings_count',
    },
    {
      title: 'Rating',
      dataIndex: 'ratings',
      key: 'ratings',
      render: (ratings) => ratings || 'Null',
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },

    {
      title: 'Actions',
      key: 'id',
      width: 200,
      render: (category) => (
        <div>
             <Button style={{ marginRight: '5px' }} title='View service provider details'>
              <Link to={`/service-provider/${category?.id}`}>{'View'}</Link>
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

export default ServiceProvidersTable
