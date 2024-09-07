import React, { useState } from 'react'
import Table from '../assets/navbar-img/table.svg'
import bill from '../assets/navbar-img/bill.svg'
import basket from '../assets/navbar-img/basket.svg'


export const Navbar = (props) => {
  

    return (
      <div >
      <div className='Main-Navbar rounded-b-2xl shadow-xl '>
        <div className='container-sm'>
              <div className='pt-14 pb-10'>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <img src={Table} className='me-3' alt="table" />
                      <div className='font-bold flex items-end whitespace-nowrap'>{props.title}</div>
                    </div>
                    <div className="flex">
                        <img src={bill} alt="bill" />
                        <img src={basket} className='ms-2' alt="basket" />
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    )
  }


export default Navbar