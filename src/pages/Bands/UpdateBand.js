import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { editBand, getAllBands } from '../../redux/bandSlice'
import { notification } from 'antd'

const initialFormState = {
  name: "",
  description: "",
  minimum: "",
  discount_enabled: "",
  bulk_discount_amount: "",
  bulk_discount_percentage:"",
  general_discount: ""
}

function UpdateBand({ band }) {
  const [show, setShow] = useState(false)
  const [bandFormData, setbandFormData] = useState(initialFormState)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setbandFormData({
      ...bandFormData,
      [name]: value,
    })
  }


  useEffect(() => {
    setbandFormData({
      name: band.name,
      description: band.description,
      minimum: band.minimum,
      discount_enabled: band.discount_enabled,
      bulk_discount_amount: band.bulk_discount_amount,
      bulk_discount_percentage: band.bulk_discount_percentage,
      general_discount: band.general_discount
    })
  }, [band])

  const clearFormData = () => {
    setbandFormData({
      name: "",
      description: "",
      minimum: "",
      discount_enabled: "",
      bulk_discount_amount: "",
      bulk_discount_percentage:"",
      general_discount: ""
    })
  }

  const handleEditCategory = (e) => {
    e.preventDefault()
    const data = {
      name: bandFormData.name,
      description: bandFormData.description,
      minimum: bandFormData.minimum,
      discount_enabled: bandFormData.discount_enabled === "" ? bandFormData.discount_enabled : "0" ,
      bulk_discount_amount: bandFormData.bulk_discount_amount,
      bulk_discount_percentage: bandFormData.bulk_discount_percentage,
      general_discount: bandFormData.general_discount,
      band_id: band?.id,
    };


    setConfirmLoading(true)
    dispatch(editBand(data))
      .then((response) => {
        setConfirmLoading(false)
        if (response.type === 'band/edit/fulfilled') {
          dispatch(getAllBands())
          handleClose()
          //   clearFormData()
          notification.success({
            message: 'band updated successfully',
          })
        } else if (response.type === 'band/edit/rejected') {
          notification.error({
            message: response?.payload?.message,
          })
          console.log('error notification', response?.payload?.message)
        }
      })
      .catch((error) => {
        setConfirmLoading(false)
        console.log('error notification', 'Error updating band, please try again')
      })
  }

  return (
    <>
      <span onClick={handleShow}>Edit</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={clearFormData}>
          <Modal.Title>Edit band</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleEditCategory}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter band name"
                defaultValue={bandFormData.name}
                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>description </Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                defaultValue={bandFormData.description}

                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
         
          

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Minimum </Form.Label>
              <Form.Control
                type="text"
                name="minimum"
                placeholder="Minimum"
                defaultValue={bandFormData.minimum}

                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Bulk discount amount </Form.Label>
              <Form.Control
                type="text"
                name="bulk_discount_amount"
                placeholder="Bulk discount amount"
                defaultValue={bandFormData.bulk_discount_amount}

                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Bulk discount percentage </Form.Label>
              <Form.Control
                type="text"
                name="bulk_discount_percentage"
                placeholder="Bulk discount percentage"
                defaultValue={bandFormData.bulk_discount_percentage}

                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> General discount </Form.Label>
              <Form.Control
                type="text"
                name="general_discount"
                placeholder="General discount"
                defaultValue={bandFormData.general_discount}

                onChange={(evt) => handleInputChange(evt)}
              />
            </Form.Group>

            <Form.Group
              controlId="exampleForm.ControlSelect1"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Discount Enabled</Form.Label>
              <Form.Select
  name="discount_enabled"
  onChange={(evt) => setbandFormData({
    ...bandFormData,
    discount_enabled: evt.target.value,
  })}
  aria-label="Default select example"
  value={bandFormData.discount_enabled}
>
  <option value="1">Yes</option>
  <option value="0">No</option>
</Form.Select>

            </Form.Group>
          

            <Button style={{marginTop: '10px', background: '#ff0303', color: '#fff', border: 'none'}}
              variant="primary"
              type="submit"
              disabled={confirmLoading ? true : false}
            >
              {confirmLoading ? "Please wait..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default UpdateBand
