import React, { Component } from 'react'
import SiteBar_Menage from '../components/SiteBar_Menage'
import Food from '../assets/board/food.png'
import Edit from '../assets/board/edit.svg'
import Delete from '../assets/board/delete.svg'
import Bar from '../assets/board/bar.svg'
import NavbarService from '../components/Navbar_service'







export const board_Menage = () => {


    return (
      <div className='board-menage'>
        <NavbarService title="ระบบจัดการเมนูอาหาร" />
           <div className='Main-Navbar rounded-b-2xl shadow-xl sm:hidden '>
        <div className='container-sm'>
              <div className='pt-14 pb-10 '>
              <div className='grid justify-stretch'>
                  <img src={Bar} alt=""  />
                  <div className='justify-self-center'>
                     <div>
                       <div className='flex justify-center'>เมนู</div>
                       <div className='sm:text-2xl mt-3 font-bold text-white flex items-center px-8 py-2 rounded-md' style={{backgroundColor: "#73A53A"} }><a href='/addmenu' target='_blank'>+ เพิ่มเมนู</a></div>
                     </div>
                  </div>
              </div>
              </div>
           </div>
        </div>
       <div className='flex container-edit'> 
        {/* <SiteBar_Menage /> */}
        
        <div className='m-6 bg-white w-full rounded-md p-6'>
          <div className='sm:flex hidden  justify-between'>
            <div className='flex'>
              <img src={Bar} alt="" className='me-6 xl:hidden' />
              <div className='text-3xl font-bold '>เมนู</div>
              </div>
          <div className='sm:text-md font-bold text-white flex items-center px-8 rounded-md' style={{backgroundColor: "#73A53A"} }><a href='/addmenu' target='_blank'>+ เพิ่มเมนู</a></div>
            </div>

          <div className='sm:flex  p-6 shadow-xl rounded-xl'>
            <div className='flex justify-center'><img src={Food} alt="" className='rounded-xl w-full' /></div>
            <div className='sm:ms-6 sm:flex sm:justify-between w-full'>
             <div>
                <div className='sm:text-2xl text-md mt-3 sm:mt-0 flex justify-center text-nowrap font-bold'>ชื่ออาหาร</div>
                <div className='mt-3 ms-3 text-sm'>
                  <ul className='list-disc'>
                    <li>รายละเอียด</li> 
                    <li>รายละเอียด</li>
                    <li>รายละเอียด</li>
                  </ul>
                </div>
             </div>
             <div className='flex justify-end w-full  sm:items-center mt-3'>
                <img src={Edit} alt="" className='p-2 sm:p-3 rounded-md w-full h-8 sm:w-12 sm:h-12 ' style={{backgroundColor: "#337DCC"}} />
                <img src={Delete} alt="" className='ms-3 p-2 sm:p-3  w-full h-8  sm:w-12 sm:h-12 rounded-md orange-back' />
             </div>
            </div>
          </div>

          <div className='sm:flex  p-6 shadow-xl rounded-xl'>
            <div className='flex justify-center'><img src={Food} alt="" className='rounded-xl w-full' /></div>
            <div className='sm:ms-6 sm:flex sm:justify-between w-full'>
             <div>
                <div className='sm:text-2xl text-md mt-3 sm:mt-0 flex justify-center text-nowrap font-bold'>ชื่ออาหาร</div>
                <div className='mt-3 ms-3 text-sm'>
                  <ul className='list-disc'>
                    <li>รายละเอียด</li> 
                    <li>รายละเอียด</li>
                    <li>รายละเอียด</li>
                  </ul>
                </div>
             </div>
             <div className='flex justify-end w-full  sm:items-center mt-3'>
                <img src={Edit} alt="" className='p-2 sm:p-3 rounded-md w-full h-8 sm:w-12 sm:h-12 ' style={{backgroundColor: "#337DCC"}} />
                <img src={Delete} alt="" className='ms-3 p-2 sm:p-3  w-full h-8  sm:w-12 sm:h-12 rounded-md orange-back' />
             </div>
            </div>
          </div>

          <div className='sm:flex  p-6 shadow-xl rounded-xl'>
            <div className='flex justify-center'><img src={Food} alt="" className='rounded-xl w-full' /></div>
            <div className='sm:ms-6 sm:flex sm:justify-between w-full'>
             <div>
                <div className='sm:text-2xl text-md mt-3 sm:mt-0 flex justify-center text-nowrap font-bold'>ชื่ออาหาร</div>
                <div className='mt-3 ms-3 text-sm'>
                  <ul className='list-disc'>
                    <li>รายละเอียด</li> 
                    <li>รายละเอียด</li>
                    <li>รายละเอียด</li>
                  </ul>
                </div>
             </div>
             <div className='flex justify-end w-full  sm:items-center mt-3'>
                <img src={Edit} alt="" className='p-2 sm:p-3 rounded-md w-full h-8 sm:w-12 sm:h-12 ' style={{backgroundColor: "#337DCC"}} />
                <img src={Delete} alt="" className='ms-3 p-2 sm:p-3  w-full h-8  sm:w-12 sm:h-12 rounded-md orange-back' />
             </div>
            </div>
          </div>

          <div className='sm:flex  p-6 shadow-xl rounded-xl'>
            <div className='flex justify-center'><img src={Food} alt="" className='rounded-xl w-full' /></div>
            <div className='sm:ms-6 sm:flex sm:justify-between w-full'>
             <div>
                <div className='sm:text-2xl text-md mt-3 sm:mt-0 flex justify-center text-nowrap font-bold'>ชื่ออาหาร</div>
                <div className='mt-3 ms-3 text-sm'>
                  <ul className='list-disc'>
                    <li>รายละเอียด</li> 
                    <li>รายละเอียด</li>
                    <li>รายละเอียด</li>
                  </ul>
                </div>
             </div>
             <div className='flex justify-end w-full  sm:items-center mt-3'>
                <img src={Edit} alt="" className='p-2 sm:p-3 rounded-md w-full h-8 sm:w-12 sm:h-12 ' style={{backgroundColor: "#337DCC"}} />
                <img src={Delete} alt="" className='ms-3 p-2 sm:p-3  w-full h-8  sm:w-12 sm:h-12 rounded-md orange-back' />
             </div>
            </div>
          </div>
        
        
       
        </div>
       </div>
      </div>
    )
  }


export default board_Menage