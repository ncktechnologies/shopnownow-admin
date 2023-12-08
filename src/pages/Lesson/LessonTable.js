import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateLesson from './UpdateLesson'

const LessonTable = ({ data, loading, handleDelete, insurances }) => {
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {title && title?.substring(0, 20)} {title && title?.length >= 20 && '...'}
        </span>
      ),
    },
    {
      title: 'Insurance',
      dataIndex: 'insurance',
      key: 'insurance',
      render: (insurance) => (
        <span style={{ whiteSpace: 'nowrap' }}> {insurance && insurance?.name}</span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          {' '}
          {description && description?.substring(0, 20)}{' '}
          {description && description?.length >= 20 && '...'}
        </span>
      ),
    },
    {
      title: 'Image',
      key: 'id',
      dataIndex: 'image',
      align: 'center',
      render: (image) => (
        <Link to={`${image}`}>
          {image ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={image}
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
            <Button style={{ marginRight: '5px' }} title='View lesson'>
              <Link to={`/lesson/details/${singleData?.id}/${singleData?.slug}`}>{'View'}</Link>
            </Button>
            <Button style={{ marginRight: '5px' }} title='Edit lesson'>
              <UpdateLesson lesson={singleData} insurances={insurances} />
            </Button>
            <Button danger onClick={() => handleDelete(singleData)} title='Permantly delete lesson'>
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
        pagination={data.length > 10 ? true : false}
        dataSource={data}
        rowKey='id'
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default LessonTable
