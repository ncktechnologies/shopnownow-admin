import React from 'react'

export default function ProductImages({ images }) {
  const productImages =
    images &&
    images.map((image, key) => {
      return <img src={image.image_url} alt='horse' width='{40}' height='{40}' key={key} />
    })
  return <div>{productImages != '' ? productImages : 'No other images found'}</div>
}
