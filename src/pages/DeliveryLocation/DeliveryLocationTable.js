import { Avatar, Button, Table, Switch } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateDeliveryLocation from './UpdateDeliveryLocation'
import { NumericFormat } from 'react-number-format'


const DeliveryLocationTable = ({ data, loading, handleDelete }) => {
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
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ...getColumnSearchProps({
        dataIndex: 'location',
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
      render: (price) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          <NumericFormat
            value={price}
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
              <Link to={`/delivery/details/${singleData?.id}`}>{'View'}</Link>
            </Button>

            <Button style={{ marginRight: '5px' }} title='Edit delivery location'>
              <UpdateDeliveryLocation deliveryLocation={singleData} />
            </Button>

            <Button
            danger
            onClick={() => handleDelete(singleData)}
            title='delete delivery location'
          >
            delete
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
        pagination={data?.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default DeliveryLocationTable
