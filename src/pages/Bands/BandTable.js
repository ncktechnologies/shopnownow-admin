import { Avatar, Button, Table, Switch } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateBand from './UpdateBand'
import { NumericFormat } from 'react-number-format'

const BandTable = ({ data, loading }) => {
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {description && description?.substring(0, 80)}{" "}
          {description && description?.length >= 80 && "..."}
        </span>
      ),
    },

    {
      title: 'Discount enabled',
      dataIndex: 'discount_enabled',
      key: 'discount_enabled',
      ...getColumnSearchProps({
        dataIndex: 'discount_enabled',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (discount_enabled) => (
        <span style={{ whiteSpace: 'nowrap' }}> {discount_enabled === 1 ? "Yes" : "No"}</span>
      ),
    },

    {
      title: 'Minimum',
      dataIndex: 'minimum',
      key: 'minimum',
      ...getColumnSearchProps({
        dataIndex: 'minimum',
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
      title: 'Free delivery threshold',
      dataIndex: 'free_delivery_threshold',
      key: 'free_delivery_threshold',
      render: (free_delivery_threshold) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          <NumericFormat
            value={free_delivery_threshold}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        </span>
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
              <Link to={`/bands/details/${singleData?.id}`}>{'View'}</Link>
            </Button>

            <Button style={{ marginRight: '5px' }} title='Edit band'>
              <UpdateBand band={singleData} />
            </Button>
    

          
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

export default BandTable
