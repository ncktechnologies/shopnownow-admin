import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import { NumericFormat } from 'react-number-format'


const TotalSalesTable = ({ data, loading }) => {
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
      title: 'Product name',
      dataIndex: 'product_name',
      key: 'product_name',
    },

    {
        title: 'Total Sold',
        dataIndex: 'total_sold',
        key: 'total_sold',
      },
      {
        title: 'Total amount',
        dataIndex: 'total_amount',
        key: 'total_amount',
        render: (total_amount) => (
          <span style={{ whiteSpace: 'nowrap' }}>
            <NumericFormat
              value={total_amount}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₦'}
            />
          </span>
        ),
      },

  ]

  return (
    <div style={{marginBottom: '30px'}}>
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

export default TotalSalesTable