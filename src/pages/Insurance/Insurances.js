import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteInsurance, getAllInsurances } from '../../redux/InsuranceSlice'
import CreateInsurance from './CreateInsurance'
import InsuranceTable from './InsuranceTable'
import { getAllCategories } from '../../redux/categorySlice'
import { getAllCompanies } from '../../redux/companySlice'
import CategoryTabs from './CategoryTabs'
import { InsuranceService } from '../../services/InsuranceService'

const Insurances = () => {
  const { insurances } = useSelector((state) => state)
  const { categories } = useSelector((state) => state)
  const { companies } = useSelector((state) => state)

  const dispatch = useDispatch()

  const [motoInsurances, setMotoInsurances] = useState([])
  const [travelInsurances, settravelInsurances] = useState([])
  const [shopInsurances, setshopInsurances] = useState([])
  const [homeInsurances, sethomeInsurances] = useState([])
  const [discountedInsurances, setdiscountedInsurances] = useState([])
  const [popularInsurances, setpopularInsurances] = useState([])

  useEffect(() => {
    dispatch(getAllInsurances())
    dispatch(getAllCategories())
    dispatch(getAllCompanies())
    listMotoInsurances()
    listTravelInsurances()
    listShopInsurances()
    listHomeInsurances()
    listDiscountedInsurances()
    listPopularInsurances()
  }, [])

  const listMotoInsurances = () => {
    setMotoInsurances(
      insurances?.data.filter((insurance) => insurance?.category?.name == 'Moto Insurance'),
    )
  }

  const listTravelInsurances = () => {
    settravelInsurances(
      insurances?.data.filter((insurance) => insurance?.category?.name == 'Travel Insurance'),
    )
  }

  const listShopInsurances = () => {
    setshopInsurances(
      insurances?.data.filter((insurance) => insurance?.category?.name == 'Shop Insurance'),
    )
  }

  const listHomeInsurances = () => {
    sethomeInsurances(
      insurances?.data.filter((insurance) => insurance?.category?.name == 'Home Insurance'),
    )
  }

  const listDiscountedInsurances = () => {
    setdiscountedInsurances(
      insurances?.data.filter((insurance) => insurance?.is_discounted == 'yes'),
    )
  }

  const listPopularInsurances = () => {
    InsuranceService.getPopularInsurance()
      .then((res) => {
        setpopularInsurances(res?.data)
      })
      .catch((err) => {
        console.log('popular error', err)
      })
  }

  const handleDelete = ({ id }) => {
    if (!window.confirm('Do You want to permanently delete the selected insurance?')) {
      return
    }

    dispatch(deleteInsurance(id))
      .then((response) => {
        if (response.type === 'insurance/delete/fulfilled') {
          dispatch(getAllInsurances())
          notification.success({
            message: ' insurance deleted successfully',
          })
        } else if (response.type === 'insurance/delete/rejected') {
          notification.error({
            message: response?.payload?.message || 'Error deleting insurance, please try again',
          })
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error deleting insurance, please try again later',
        })
      })
  }

  return (
    <div>
      <PageHeader
        extra={[
          <Button key='CreateInsurance'>
            <CreateInsurance categories={categories.data} companies={companies.data} />,
          </Button>,
        ]}
        title='Insurances'
      />
      <CategoryTabs
        insurances={insurances.data}
        motos={motoInsurances}
        shops={shopInsurances}
        travels={travelInsurances}
        homes={homeInsurances}
        discounted={discountedInsurances}
        popular={popularInsurances}
      />
      
      {/* <InsuranceTable
        data={insurances.data}
        loading={insurances.loading}
        handleDelete={handleDelete}
        categories={categories.data}
        companies={companies.data}
      /> */}
    </div>
  )
}

export default Insurances
