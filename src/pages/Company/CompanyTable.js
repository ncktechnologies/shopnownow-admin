import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateCompany from './UpdateCompany'

const CompanyTable = ({ data, loading, handleDelete }) => {
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
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      ...getColumnSearchProps({
        dataIndex: 'website',
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
      render: (description) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {description && description?.substring(0, 5)}{' '}
          {description && description?.length >= 20 && '...'}
        </span>
      ),
    },
    {
      title: 'Logo',
      key: 'id',
      dataIndex: 'logo',
      align: 'center',
      render: (logo) => (
        <Link to={`${logo}`}>
          {logo ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={logo}
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
      title: 'Insurances',
      dataIndex: 'insurances',
      key: 'insurances',
      render: (insurances) => (
        <span style={{ whiteSpace: 'nowrap' }}> {insurances && insurances?.length}</span>
      ),
    },
    {
      title: 'Craeted At',
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
              <Link to={`/company/details/${singleData?.id}/${singleData?.slug}`}>{'View'}</Link>
            </Button>
            <Button style={{ marginRight: '5px' }} title='Edit company'>
              <UpdateCompany company={singleData} />
            </Button>
            <Button
              danger
              onClick={() => handleDelete(singleData)}
              title='Permantly delete company'
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
        pagination={data && data?.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default CompanyTable
