import { Button, Table, Switch } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateSettings from './UpdateSettings'

const SettingsTable = ({ data, loading }) => {
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
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      ...getColumnSearchProps({
        dataIndex: 'key',
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
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      ...getColumnSearchProps({
        dataIndex: 'value',
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
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <div>
          <Button style={{ marginRight: '5px' }} title='Edit Location'>
              <UpdateSettings settings={singleData} />
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

export default SettingsTable
