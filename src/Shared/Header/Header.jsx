import React from 'react'

export default function Header({title,desc,img}) {
  return (
    <>
      <div>
        
      <div className='container-fluid'>
        <div className="row head-bg text-white px-5">

          <div className="col-md-8 my-auto">
          <div className="title">
              <h1>{title}</h1>
              <p>{desc}</p>
          </div>
          </div>
          
          <div className="col-md-4">
          <div className="img-container ">
            {img}
          </div>
          </div>
          
        </div>

        </div>
        
      </div>
    </>
  )
}
