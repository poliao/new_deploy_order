import React, { Component } from 'react'
import HomeImage from '../assets/board/home.svg'
import HomeImage_white from '../assets/board/home_white.svg'
export const SiteBar_Menage = () => {

    return (
      <div className='SiteBar hidden xl:block ' style={{height: "100%"}}>
        <div className='orange-back' style={{width: "360px", height: "100%"}}>
            <div className='text-3xl font-bold text-white p-10' style={{marginBottom: "100px"}}>ระบบจัดการร้าน</div>
        <div>
            <ul>
                <li className='flex bg-white' style={{color: "#FF724C"}}><img src={HomeImage} alt="" className='me-6 ms-10'  />หน้าหลัก</li>
                <li className='flex ' ><img src={HomeImage_white} alt="" className='me-6 ms-10'  />หน้าหลัก</li>
             
                
               
            </ul>
        </div>
        </div>
      </div>
    )
  }


export default SiteBar_Menage