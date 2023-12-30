import React from 'react'

const DownloadCSVButton = ({
  data,
  keys,
  dateSliceLength,
  orderKey,
  amountKey,
  priceKey,
  discountKey,
  userKey,
  categoryKey,
  companyKey,
  filename,
  insuranceKey
}) => {
  const getPropertyValueLength = (obj, key) => {
    const value = obj[key]
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        return JSON.stringify(value.length) // Convert the array of objects to a string representing its length
      }
    }
    return value ? value.length : 0
  }

  const sliceDate = (date) => {
    return date.slice(0, dateSliceLength)
  }

  const formatAmount = (amount) => {
    return `₦${amount}` // Add the Naira sign (₦) to the amount
  }

  const getUserName = (user) => {
    return user ? user.first_name : ''
  }

  const getCategory = (category) => {
    return category ? category.name : ''
  }

  const getCompany = (company) => {
    return company ? company.name : ''
  }

  const convertToCSV = (array, selectedKeys) => {
    const header = selectedKeys.join(',') + ',' + '\n'
    const rows = array.map((obj) => {
      const values = selectedKeys.map((key) => {
        if (key === 'created_at') {
          return sliceDate(obj[key]) // Slice the "created_at" property to 10 characters
        } else if (key === orderKey || key === insuranceKey) {
          return getPropertyValueLength(obj, orderKey || insuranceKey) // Retrieve the length of the "order" array
        } else if (key === amountKey || key === priceKey || key === discountKey) {
          return formatAmount(obj[key]) // Format the "amount" with the Naira sign
        } else if (key === userKey) {
          return getUserName(obj[key]) // Get the "name" from the "user" object
        } else if (key === categoryKey) {
          return getCategory(obj[key]) // Get the "name" from the "category" object
        } else if (key === companyKey) {
          return getCompany(obj[key]) // Get the "name" from the "company" object
        } else {
          return obj[key]
        }
      })
      return values.join(',') + ',' + '\n'
    })
    return header + rows.join('')
  }

  const downloadCSV = () => {
    const csv = convertToCSV(data, keys)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename + '.csv')
    document.body.appendChild(link)

    link.click()

    // Clean up the temporary anchor element and the URL created
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div>
      <button style={{color: '#ff0303', backgroundColor:'#fff', border: '1px solid #ff0303'}}onClick={downloadCSV}>
        Download CSV
      </button>
    </div>
  )
}

export default DownloadCSVButton


