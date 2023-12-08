import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'

import { getColumnSearchProps } from '../../utils/tableColSearch'
import { NumericFormat } from 'react-number-format'

const BulkDropoff = ({ data }) => {
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
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
      ...getColumnSearchProps({
        dataIndex: 'item_name',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps({
        dataIndex: 'description',
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
        title: 'Item value',
        dataIndex: 'item_value',
        key: 'item_value',
        ...getColumnSearchProps({
          dataIndex: 'item_value',
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
      title: 'Dropoff address',
      dataIndex: 'dropoff_address',
      key: 'dropoff_address',
      ...getColumnSearchProps({
        dataIndex: 'dropoff_address',
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
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
        ...getColumnSearchProps({
          dataIndex: 'phone_number',
          handleReset,
          searchInput,
          handleSearch,
          setSearchedColumn,
          searchText,
          setSearchText,
          searchedColumn,
        }),
      },

    // {
    //   title: 'Total',
    //   dataIndex: 'total',
    //   key: 'total',
    //   render: (total) => (
    //     <span style={{ whiteSpace: 'nowrap' }}>
    //       <NumericFormat
    //         value={total}
    //         displayType={'text'}
    //         thousandSeparator={true}
    //         prefix={'₦'}
    //       />
    //     </span>
    //   ),
    // },

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

  ]

  return (
    <div>
        <h2 style={{paddingTop: '50px'}}>Bulk Dropoff Details</h2>
      <Table
        columns={columns}
        pagination={data?.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default BulkDropoff
