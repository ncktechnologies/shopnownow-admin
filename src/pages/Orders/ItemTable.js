import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const ProductTable = ({ data, loading, handleDelete }) => {
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

  console.log(data)

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
      title: 'Available',
      dataIndex: 'availability',
      key: 'availability',
      ...getColumnSearchProps({
        dataIndex: 'availability',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),

      render: (availability) => availability === 1 ? 'Yes' : 'No',
    },
    {
      title: 'Measurement Unit',
      dataIndex: 'unit_of_measurement',
      key: 'unit_of_measurement',
      ...getColumnSearchProps({
        dataIndex: 'unit_of_measurement',
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₦${Number(price).toLocaleString()}` || 'Null',
    },

    {
      title: 'Image',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <Link to={`${singleData?.id}`}>
          {singleData?.thumbnail_url ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={singleData?.thumbnail_url}
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
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },

    {
      title: 'Date Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (updated_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(updated_at).format('DD MMM YYYY')}</span>
      ),
    },
    
    // {
    //   title: 'Actions',
    //   key: 'id',
    //   align: 'center',
    //   render: (singleData) => (
    //     <>
    //       <Button style={{ marginRight: '5px' }} title='View product details'>
    //         <Link to={`/product/details/${singleData?.id}/${singleData?.sku}`}>{'View'}</Link>
    //       </Button>
    //       <Button style={{ marginRight: '5px' }} title='Edit product'>
    //         <Link to={`/product/edit/${singleData?.id}/${singleData?.sku}`}>Edit</Link>
    //       </Button>
    //       <Button
    //         danger
    //         onClick={() => handleDelete(singleData)}
    //         title='Temporarily delete product'
    //       >
    //         delete
    //       </Button>
    //     </>
    //   ),
    // },
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

export default ProductTable
