import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBands } from '../../redux/bandSlice'
import CreateBand from './CreateBand'
import BandTable from './BandTable'

const Bands = () => {
  const { band } = useSelector((state) => state)
  const dispatch = useDispatch()


  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllBands())
  }, [])




  return (
    <div>
      <PageHeader
        extra={[
          <Button key='Createband' style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateBand />
          </Button>,
        ]}
        title='Bands'
      />
      <BandTable
        data={band.data}
        loading={band.loading}
      />
    </div>
  )
}

export default Bands
