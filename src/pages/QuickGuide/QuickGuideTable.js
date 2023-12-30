import { Avatar, Button, Table, Switch} from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateQuickGuide from './UpdateQuickGuide'

const QuickGuideTable = ({ data, loading, hideShowQuickGuide, handleDelete }) => {
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
      ...getColumnSearchProps({
        dataIndex: 'title',
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
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      ...getColumnSearchProps({
        dataIndex: 'body',
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),

      render: (body) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {body && body?.substring(0, 60)}{" "}
          {body && body?.length >= 60 && "..."}
        </span>
      ),
    },
    {
      title: 'Image',
      key: 'id',
      dataIndex: 'image_path',
      align: 'center',
      render: (image_path) => (
        <div>
          {image_path ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={image_path}
              height={60}
              width={60}
              alt='avatar'
            />
          ) : (
            <Avatar style={{ backgroundColor: '#3f8bcaa1' }} icon={<UserOutlined />} size={50} />
          )}
        </div>
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
            <Button style={{ marginRight: '5px' }} title='Edit QuickGuide'>
              <UpdateQuickGuide quickGuide={singleData} />
            </Button>
            <Button style={{ marginRight: '5px' }}
            danger
            onClick={() => handleDelete(singleData)}
            title='delete quick guide'
          >
            delete
          </Button>
            <Switch style={{backgroundColor: '#ff0303', marginLeft: '10px'}}
            
              checked={singleData?.is_hidden === 0}
              onChange={() => hideShowQuickGuide(singleData?.id)}
            />
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

export default QuickGuideTable
