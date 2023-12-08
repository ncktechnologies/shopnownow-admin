import { Table } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getColumnSearchProps } from '../../utils/tableColSearch'

const BookingTable = ({ data, loading, parent }) => {
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
      title: 'Booking ID',
      key: 'order_id',
      dataIndex: 'order_id',
      ...getColumnSearchProps({
        dataIndex: 'order_id',
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
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      hidden: parent === 'client' && true,
      render: (client) => (
        <Link to={`/clients/${client?.id}`}>{`${client?.first_name} ${client?.last_name}`}</Link>
      ),
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
      render: (provider) => (
        <Link
          to={`/service-provider/${provider?.id}`}
        >{`${provider?.first_name} ${provider?.last_name}`}</Link>
      ),
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      render: (appointment_date) => moment(appointment_date, 'YYYY-MM-DD').format('MMM Do YYYY'),
    },
    {
      title: 'Appointment Time',
      dataIndex: 'appointment_time',
      key: 'appointment_time',
    },
    {
      title: 'Agreed Fee',
      dataIndex: 'agreed_fee',
      key: 'agreed_fee',
      render: (agreed_fee) => `₦${Number(agreed_fee).toLocaleString()}`,
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
      hidden: parent === 'client' && true,
      render: (payment_method) => payment_method?.name,
    },
    {
      title: 'Appointment Status',
      dataIndex: 'appointment_status',
      key: 'appointment_status',
      sorter: (a, b) => String(a?.appointment_status).localeCompare(String(b?.appointment_status)),
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => (
        <span style={{ whiteSpace: 'nowrap' }}> {moment(created_at).format('DD MMM YYYY')}</span>
      ),
    },
  ].filter((item) => !item.hidden)

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

export default BookingTable
