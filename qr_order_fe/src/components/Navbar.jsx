import React, { useState,useEffect } from 'react'
import Table from '../assets/navbar-img/table.svg'
import bill from '../assets/navbar-img/bill.svg'
import basket from '../assets/navbar-img/basket.svg'


export const Navbar = (props) => {

  const storedtableId = localStorage.getItem("tableId");

  


  // useEffect(() => {
  //   const BreakeTable = JSON.parse(storedtableId);
  //   console.log(BreakeTable);
  // }, [storedtableId]);

  // const handleBillClick = () => {
  //   if (storedtableId) {
  //     window.location.href = `/status/${storedtableId}`;
  //   } else {
  //     console.warn('tableid is not defined');
  //     // Optionally handle the case when tableid is not defined
  //   }
  // };






  

    return (
      <div className='fixed top-0 w-full z-10' >
      <div className='Main-Navbar rounded-b-2xl shadow-xl bg-white '>
        <div className='container-sm'>
              <div className='pt-14 pb-10'>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <img src={Table} className='me-3' alt="table" />
                      <div className='font-bold flex items-end whitespace-nowrap'>{props.title}</div>
                    </div>
                    <div className="flex">
                    <a href="#" onClick={() => {  window.location.href = `/status/${storedtableId}` }}>
                  <img src={bill} alt="bill" />
                </a>
                        <a href='/basket'><img src={basket} className='ms-2' alt="basket" /></a>
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    )
  }


export default Navbar