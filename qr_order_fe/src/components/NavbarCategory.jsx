import React, { useEffect  } from 'react'
import Table from '../assets/navbar-img/table.svg'
import bill from '../assets/navbar-img/bill.svg'
import basket from '../assets/navbar-img/basket.svg'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const NavbarCategory = (props) => {

  
  const storedtableId = localStorage.getItem("tableId");

  


  useEffect(() => {
    const BreakeTable = JSON.parse(storedtableId);
    console.log(BreakeTable);
  }, [storedtableId]);


    return (
      <div>
      <div className='Main-Navbar rounded-b-2xl shadow-xl fixed w-full top-0 bg-white '>
        <div className='container-sm'>
              <div className='pt-14 pb-10'>
                  <div className='flex justify-between'>
                    <div className='flex items-center'>
                      <a href='/home/1' ><ArrowBackIcon className='orange-text' /></a>
                      <div className='font-bold flex items-end whitespace-nowrap ms-3'>{props.title}</div>
                    </div>
                    <div className="flex">
                       <a> <img src={bill} alt="bill" onClick={() => {  window.location.href = `/status/${storedtableId}` }} /></a>
                        <a href='/basket'><img src={basket} className='ms-2' alt="basket" /></a>
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    )
  }


export default NavbarCategory