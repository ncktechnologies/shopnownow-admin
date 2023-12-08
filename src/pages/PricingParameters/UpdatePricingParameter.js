import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import Messages from '../../ToastMessages/Messages'
import { useEffect } from 'react'
import { notification } from 'antd'
import {getAllPricingParameters, editPricingParameter} from '../../redux/pricingparameterSlice'

const initialFormState = {
  value: '',
  status: '',
}

function UpdatePricingParameter({ pricing }) {
  const [show, setShow] = useState(false)
  const [pricingFormData, setpricingFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setpricingFormData({
      ...pricingFormData,
      [name]: value,
    })
  }

  useEffect(() => {
    setpricingFormData({
      value: pricing?.value || '',
      status: pricing?.status || 'enabled',
    });

  }, [pricing]);
  
  const clearFormData = () => {
    setpricingFormData({
      value: '',
      status: '',
    })
  }

  const handleEditPricing = (e) => {
    e.preventDefault()
    const data = {
      label: pricing.label,
      value: pricingFormData.value,
      status: pricingFormData.status,
      option: pricing.option,
      pricing_parameter_id: pricing?.id,
    };


    setConfirmLoading(true)
    dispatch(editPricingParameter(data))
      .then((response) => {
        console.log(response)
        setConfirmLoading(false)
        if (response.type === 'pricingparameter/edit/fulfilled') {
          dispatch(getAllPricingParameters())
          handleClose()
            clearFormData()
          console.log('response act', response)
          notification.success({
            message: 'Pricing parameter updated successfully',
          })
        } else if (response.type === 'pricingparameter/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notification', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error updating Pricing parameter, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit Pricing Parameter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditPricing}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>VAT(%)</Form.Label>
              <Form.Control
                type='text'
                name='value'
                defaultValue={pricingFormData.value}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicStatus'>
          <Form.Label>Status</Form.Label>
          <Form.Select
            name='status'
            onChange={(evt) => handleInputChange(evt)}
            aria-label='Default select example'
            required
            value={pricingFormData.status}
          >
            <option value=''>Select status</option>
            <option value='Enabled'>Enabled</option>
            <option value='Disabled'>Disabled</option>
          </Form.Select>
        </Form.Group>

            <Button variant='primary' type='submit' disabled={confirmLoading ? true : false}>
              {confirmLoading ? 'Please wait...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default UpdatePricingParameter
