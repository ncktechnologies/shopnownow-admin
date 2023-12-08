import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const VarietyBoxTable = ({ data, loading, handleDelete }) => {
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
      title: 'Ref. Id',
      dataIndex: 'sku',
      key: 'sku',
      ...getColumnSearchProps({
        dataIndex: 'sku',
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps({
        dataIndex: 'name',
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
      title: 'Individual Price',
      dataIndex: 'individual_price',
      key: 'individual_price',
      render: (individual_price) => `₦${Number(individual_price).toLocaleString()}` || 'Null',
    },
    {
      title: 'Group Price',
      dataIndex: 'group_price',
      key: 'group_price',
      render: (group_price) => `₦${Number(group_price).toLocaleString()}` || 'Null',
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
      title: 'Image',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <Link to={`${singleData?.id}`}>
          {singleData?.featured_image ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={singleData?.featured_image}
              height={60}
              width={60}
              alt='avatar'
            />
          ) : (
            <Avatar style={{ backgroundColor: '#3f8bcaa1' }} icon={<UserOutlined />} size={50} />
          )}
        </Link>
      ),
    },
    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <Button style={{ marginRight: '5px' }} title='View product details'>
            <Link to={`/variety-box/details/${singleData?.id}/${singleData?.sku}`}>{'View'}</Link>
          </Button>
          <Button style={{ marginRight: '5px' }} title='Edit product'>
            <Link to={`/variety-box/edit/${singleData?.id}/${singleData?.sku}`}>Edit</Link>
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

export default VarietyBoxTable
