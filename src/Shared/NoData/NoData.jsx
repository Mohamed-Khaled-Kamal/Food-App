import React from 'react'
import NoInfo from '../../assets/Imgs/No-data.png'

export default function NoData() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                  <img src={NoInfo} alt="No Data" />
                </div>
  )
}
