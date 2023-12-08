import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from '../../utils/tableColSearch'
import UpdateInsurance from './UpdateInsurance'
import { NumericFormat } from 'react-number-format'

const InsuranceTable = ({ data, loading, handleDelete, categories, companies }) => {
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <span style={{ whiteSpace: 'nowrap' }}> {category && category?.name}</span>
      ),
    },

    // {
    //   title: 'Company',
    //   dataIndex: 'company',
    //   key: 'company',
    //   render: (company) => (
    //     <span style={{ whiteSpace: 'nowrap' }}> {company && company?.name}</span>
    //   ),
    // },
    {
      title: 'Policy',
      dataIndex: 'insurance_policy',
      key: 'insurance_policy',
      ...getColumnSearchProps({
        dataIndex: 'insurance_policy',
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
      title: '% value',
      dataIndex: 'insurance_policy_percentage_value',
      key: 'insurance_policy_percentage_value',
      ...getColumnSearchProps({
        dataIndex: 'insurance_policy_percentage_value',
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
          <NumericFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
        </span>
      ),
    },

    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount) => <span style={{ whiteSpace: 'nowrap' }}> {discount}</span>,
    },

    {
      title: 'Discounted price',
      dataIndex: 'discounted_price',
      key: 'discounted_price',
      render: (discounted_price) => (
        <span style={{ whiteSpace: 'nowrap' }}>
          <NumericFormat
            value={discounted_price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        </span>
      ),
    },

    {
      title: 'Banner',
      key: 'id',
      dataIndex: 'banner',
      align: 'center',
      render: (banner) => (
        <Link to={`${banner}`}>
          {banner ? (
            <img
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={banner}
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

    // {
    //   title: 'Lessons',
    //   dataIndex: 'lessons',
    //   key: 'lessons',
    //   render: (lessons) => (
    //     <span style={{ whiteSpace: 'nowrap' }}> {lessons && lessons?.length}</span>
    //   ),
    // },

    {
      title: 'Actions',
      key: 'id',
      align: 'center',
      render: (singleData) => (
        <>
          <div>
            <Button style={{ marginRight: '5px' }} title='View product details'>
              <Link to={`/insurance/details/${singleData?.id}/${singleData?.slug}`}>{'View'}</Link>
            </Button>
            <Button style={{ marginRight: '5px' }} title='Edit insurance'>
              <UpdateInsurance
                insurance={singleData}
                categories={categories}
                companies={companies}
              />
            </Button>
            <Button
              danger
              onClick={() => handleDelete(singleData)}
              title='Permantly delete insurance'
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

export default InsuranceTable
