import { Avatar, Button, Table, Switch } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateCategory from './UpdateCategory'


const CategoryTable = ({ data, loading, hideShowCategory }) => {
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
      title: 'Delivery',
      dataIndex: 'delivery_option',
      key: 'delivery_option',
      ...getColumnSearchProps({
        dataIndex: 'delivery_option',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (delivery_option) => (
        <span style={{ whiteSpace: 'nowrap' }}> {delivery_option === 1 ? "Yes" : "No"}</span>
      ),
    },

    {
      title: 'Discount option',
      dataIndex: 'discount_option',
      key: 'discount_option',
      ...getColumnSearchProps({
        dataIndex: 'discount_option',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (discount_option) => (
        <span style={{ whiteSpace: 'nowrap' }}> {discount_option === 1 ? "Yes" : "No"}</span>
      ),
    },
    {
      title: 'Image',
      key: 'id',
      dataIndex: 'thumbnail',
      align: 'center',
      render: (thumbnail) => (
        <Link to={`${thumbnail}`}>
          {thumbnail ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={thumbnail}
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
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      ...getColumnSearchProps({
        dataIndex: 'created_at',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
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
          <div>
          <Button style={{ marginRight: '5px' }} title='View category details'>
              <Link to={`/categories/details/${singleData?.id}`}>{'View'}</Link>
            </Button>

            <Button style={{ marginRight: '5px' }} title='Edit category'>
              <UpdateCategory category={singleData} />
            </Button>
       

            <Switch style={{backgroundColor: '#ff0303', marginLeft: '10px'}}
            
              checked={singleData?.hidden === 0}
              onChange={() => hideShowCategory(singleData?.id)}
            />
          </div>
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

export default CategoryTable
