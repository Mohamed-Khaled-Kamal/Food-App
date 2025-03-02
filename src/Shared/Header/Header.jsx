import React from 'react'

export default function Header({ title, desc, img }) {
  return (
    <div className='px-3 py-2 mb-3'>
      <div className='container-fluid'>
        <div className="head-bg text-white px-5 py-3 rounded-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          
          
          <div className="title mb-3 mb-md-0">
            <h1>{title}</h1>
            <p>{desc}</p>
          </div>
          
          
          <div className="img-container">
            {img}
          </div>
          
        </div>
      </div>
    </div>
  )
}

