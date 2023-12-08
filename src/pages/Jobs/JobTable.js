import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateCompany from './UpdateJob'

const JobTable = ({ data, loading, handleDelete }) => {
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
      dataIndex: 'client',
      key: 'client',
      ...getColumnSearchProps({
        dataIndex: 'client',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),

      render: (client) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {client.first_name && client.first_name?.substring(0, 20)}{' '}
          {client.first_name && client.first_name?.length >= 20 && '...'}
        </span>
      ),
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {description && description?.substring(0, 100)}{' '}
          {description && description?.length >= 100 && '...'}
        </span>
      ),
    },
    // {
    //   title: 'Logo',
    //   key: 'id',
    //   dataIndex: 'logo',
    //   align: 'center',
    //   render: (logo) => (
    //     <Link to={`${logo}`}>
    //       {logo ? (
    //         <img
    //           style={{
    //             width: '60px',
    //             height: '60px',
    //             borderRadius: '50%',
    //             objectFit: 'cover',
    //           }}
    //           src={logo}
    //           height={60}
    //           width={60}
    //           alt='avatar'
    //         />
    //       ) : (
    //         <Avatar style={{ backgroundColor: '#3f8bcaa1' }} icon={<UserOutlined />} size={50} />
    //       )}
    //     </Link>
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

    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <div>
            <Button style={{ marginRight: '5px' }} title='View product details'>
              <Link to={`/job/details/${singleData?.id}/${singleData?.headline_slug}`}>{'View'}</Link>
            </Button>
            {/* <Button style={{ marginRight: '5px' }} title='Edit company'>
              <UpdateCompany company={singleData} />
            </Button>
            <Button
              danger
              onClick={() => handleDelete(singleData)}
              title='Permantly delete company'
            >
              delete
            </Button> */}
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
        pagination={data && data?.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default JobTable
