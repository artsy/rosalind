import React from 'react'

export default function Artwork (props) {
  const { title, images, artist } = props
  return (
    <div className='Artwork'>
      <h1>{title}</h1>
      <h2>{artist.name}</h2>
      <img src={images[0].image_urls.normalized} />
    </div>
  )
}
