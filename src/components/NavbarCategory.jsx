import React, {  } from 'react'
import Table from '../assets/navbar-img/table.svg'
import bill from '../assets/navbar-img/bill.svg'
import basket from '../assets/navbar-img/basket.svg'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const NavbarCategory = (props) => {

    return (
      <div>
      <div className='Main-Navbar rounded-b-2xl shadow-xl '>
        <div className='container-sm'>
              <div className='pt-14 pb-10'>
                  <div className='flex justify-between'>
                    <div className='flex items-center'>
                      <a href='/' ><ArrowBackIcon className='orange-text' /></a>
                      <div className='font-bold flex items-end whitespace-nowrap ms-3'>{props.title}</div>
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


export default NavbarCategory