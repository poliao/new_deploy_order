import React, { useState, useEffect } from 'react'
import Table from '../assets/navbar-img/table.svg'
import bill from '../assets/navbar-img/bill.svg'
import basket from '../assets/navbar-img/basket.svg'
import axios from 'axios'
import { API_ROUTES } from "../components/API_share";
import Swal from 'sweetalert2';



export const Navbar = (props) => {

  const storedtableId = localStorage.getItem("tableId");
  const [tablename, setTablename] = useState('');

  useEffect(() => {
    if (storedtableId) {
      const timer = setTimeout(() => {
        axios
          .get(API_ROUTES.API_r + "/api/tables/" + storedtableId)
          .then((res) => {
            setTablename(res.data.tableName);
          })
          .catch((error) => {
            Swal.fire({
              title: 'ไม่พบโต๊ะ',
              text: 'กรุณาติดต่อพนักงาน',
              icon: 'error',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload(); // Refresh the page
              }
            });
          });
      }, 1000); // Delay of 5 seconds (5000 milliseconds)
  
      // Clear the timeout if the component is unmounted or storedtableId changes
      return () => clearTimeout(timer);
    }
  }, [storedtableId]);
  

  return (
    <div className='fixed top-0 w-full z-10' >
      <div className='Main-Navbar rounded-b-2xl shadow-xl bg-white '>
        <div className='container-sm'>
          <div className='pt-14 pb-10'>
            <div className='flex justify-between'>
              <div className='flex'>
                <img src={Table} className='me-3' alt="table" />
                <div className='font-bold flex items-end whitespace-nowrap'>{tablename}</div>
              </div>
              <div className="flex">
                <a href="#" onClick={() => { window.location.href = `/status/${storedtableId}` }}>
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