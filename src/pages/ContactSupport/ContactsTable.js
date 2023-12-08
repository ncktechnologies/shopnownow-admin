import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const ContactsTable = ({ data, loading }) => {
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
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      ...getColumnSearchProps({
        dataIndex: 'subject',
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
      title: 'Message',
      dataIndex: 'description',
      key: 'description',
      render: (description) => <span style={{ whiteSpace: 'nowrap' }}> {description}</span>,
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          <Link style={{color: '#FF0303'}} to={`/customer/details/${user?.id}/${user?.email}`}>
            {user?.full_name}
          </Link>
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

    // {
    //   title: 'Actions',
    //   key: 'id',
    //   align: 'center',
    //   render: (singleData) => (
    //     <>
    //       <div>
    //         <Button style={{ marginRight: '5px' }} title='View product details'>
    //           <Link to={`/contacts/details/${singleData?.id}`}>{'View'}</Link>
    //         </Button>
    //       </div>
    //     </>
    //   ),
    // },
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

export default ContactsTable
