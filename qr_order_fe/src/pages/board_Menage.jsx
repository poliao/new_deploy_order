import React, { useEffect, useState } from 'react';
import SiteBar_Menage from '../components/SiteBar_Menage';
import Edit from '../assets/board/edit.svg';
import Delete from '../assets/board/delete.svg';
import Bar from '../assets/board/bar.svg';
import NavbarService from '../components/Navbar_service';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { API_ROUTES } from "../components/API_share";

import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import InsightsIcon from '@mui/icons-material/Insights';
import EditIcon from '@mui/icons-material/Edit';

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export const board_Menage = () => {
  const [open, setOpen] = useState(false);
  const [menus, setMenus] = useState([]);  // state สำหรับเก็บข้อมูลเมนูที่ดึงจาก API
  const [selectedMenu, setSelectedMenu] = useState(null); // state สำหรับเก็บเมนูที่เลือก
  const [menuTotal, setMenuTotal] = useState(0); // state สำหรับเก็บจำนวนอาหาร
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle the boolean state
  };


  // ดึงข้อมูลเมนูจาก API
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_ROUTES.API_r + '/admin/menus')
      .then((response) => {
        setMenus(response.data); // เก็บข้อมูลเมนูใน state
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching menus:', error);
      });
  }, []);

  const handleClickOpen = (menu) => {
    setSelectedMenu(menu); // เก็บเมนูที่เลือกเพื่อการเพิ่มจำนวน
    setMenuTotal(menu.total); // ตั้งค่าจำนวนอาหารเริ่มต้นตามค่า total ที่มีอยู่
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTotal = (nameMenu, menuTotal) => {
    axios.post(API_ROUTES.API_r + '/admin/menus/updateTotalsum?namemenu=' + nameMenu + '&newTotal=' + menuTotal).then((response) => {
      console.log(response.data);
      window.location.reload();
      setOpen(false); // ปิด dialog หลังจา��ที่มีการบันท��กข้อมูล
    })




  };

  const handleTotalChange = (event) => {
    setMenuTotal(event.target.value); // อัปเดตจำนวนอาหารเมื่อมีการเปลี่ยนแปลงใน input
  };

  const HandelEdit = (menuId) => {
    window.location.href = `/editmenu/${menuId}`;

  };

  const HandelDelete = (menuid) => {
    axios.delete(API_ROUTES.API_r + `/admin/menus/${menuid}`)
      .then((response) => {
        console.log(response);
        setMenus(menus.filter((menu) => menu.menuid !== menuid)); // ลบเมนูที่ถูกลบออกจา�� state
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting menu:', error);
      });
  }

  return (
    
    <div className='board-menage'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit"  />
      </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialogActions-root button": {
            color: "red",
            fontWeight: "bold",
            fontSize: "16px",
            border: "1px solid red",
            padding: "10px 20px",
            width: "100%",
          },
          "button:first-child": {
            color: "green",
            fontWeight: "bold",
            fontSize: "16px",
            border: "1px solid green",
            padding: "10px 20px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"เพิ่มจำนวนเมนูสำหรับ " + (selectedMenu ? selectedMenu.namemenu : '')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input
              type="number"
              className='border-2 border-black rounded-md py-2 px-2 w-full'
              value={menuTotal} // ตั้งค่า value เป็นจำนวนอาหารปัจจุบัน
              onChange={handleTotalChange} // อัปเดตจำนวนอาหารใน state เมื่อมีการเปลี่ยนแปลง
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddTotal(selectedMenu.namemenu, menuTotal)}>
            ตกลง
          </Button>
          <Button onClick={handleClose}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>

      
      {isSidebarVisible && (
        <div id="sidebar">
          {/* Sidebar content */}
          <div className="h-full w-3/4 sm:w-2/3  z-10 bg-white sm:p-10 p-5 pt-10 fixed">
         <div className="flex justify-end"> <img src={Bar}  alt="" className="w-8" onClick={ () => handleSidebar()} /></div>
          <div className="mt-20 font-bold ">
              <ul className="text-sm sm:text-base">
              <li className="gap-3 flex mb-5  " onClick={ () =>  window.location.href = "/homeservice"}>
                <HomeIcon />
                  <div>หน้าหลัก</div>
                </li>
                <li className="gap-3 flex mb-5 border-b-2 pb-3 orange-back p-3 text-white rounded-md shadow-md" onClick={ () =>  window.location.href = "/boardService"}>
                <EditIcon />
                  <div>จัดการเมนู</div>
                </li>
                <li className="gap-3 flex mb-5 border-b-2 pb-3" onClick={ () =>  window.location.href = "/report"}>
                <InsightsIcon />
                  <div>กระดานสรุปยอด</div>
                </li>
                <li className="gap-3 flex "  onClick={ () =>  handleLogout() } >
                <LogoutIcon />
                 <div> ออกจากระบบ</div>
                </li>
              </ul>
          </div>
          </div>
        </div>
      )}

      <NavbarService title="ระบบจัดการเมนูอาหาร" />
      <div className='Main-Navbar rounded-b-2xl shadow-xl lg:hidden '>
        <div className='container-sm'>
          <div className='pt-14 pb-10 '>
            <div className='grid justify-stretch'>
              <img onClick={ () => handleSidebar()} src={Bar} alt=" " />
              <div className='justify-self-center'>
                <div>
                  <div className='flex justify-center'>เมนู</div>
                  <div className='lg:text-2xl mt-3 font-bold text-white flex items-center px-8 py-2 rounded-md' style={{ backgroundColor: "#73A53A" }}>
                    <a href='/addmenu' target='_blank'>+ เพิ่มเมนู</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex container-edit'>
        {/* <SiteBar_Menage /> */}

        <div className='m-6 bg-white w-full rounded-md p-6'>
          <div className='lg:flex hidden justify-between'>
            <div className='flex'>
              <img src={Bar} alt="" className='me-6 xl:hidden' / >
              <div className='text-3xl font-bold '>เมนู</div>
            </div>
            <div className='lg:text-md font-bold text-white flex items-center px-8 rounded-md' style={{ backgroundColor: "#73A53A" }}>
              <a href='/addmenu' target='_blank'>+ เพิ่มเมนู</a>
            </div>
          </div>

          {/* แสดงรายการเมนูที่ดึงมาจาก API */}
          {menus.length > 0 ? (
            menus.map((menu) => (
              <div key={menu.menuId} className='lg:flex border-2 mt-4 p-6 shadow-xl rounded-xl'>
                <div className='flex justify-center'>
                  <img src={menu.img || "https://via.placeholder.com/150"} alt="" className='rounded-xl object-cover w-56 lg:h-28' />
                </div>
                <div className='lg:ms-6 lg:flex lg:justify-between w-full gap-3'>
                  <div>
                    <div className='lg:text-2xl text-md mt-3 lg:mt-0 flex justify-center lg:justify-start text-nowrap font-bold'>
                      {menu.namemenu}
                    </div>
                    <div className='mt-3 ms-3 text-sm'>
                      <ul className='list-disc'>
                        <li>{menu.detailmenu}</li>
                        <li>ราคา: {menu.price} บาท</li>
                      </ul>
                    </div>
                  </div>
                  <div className='lg:flex lg:flex-col items-center lg:justify-end gap-3 lg:gap-0'>
                    <div className='w-full mt-3 flex justify-center items-center lg:px-3 py-2 text-white orange-back rounded-md lg:h-12 whitespace-nowrap font-bold cursor-pointer text-sm'
                      onClick={() => handleClickOpen(menu)}> 
                      + เพิ่มจำนวนอาหาร
                    </div>
                    <div className='flex justify-end w-full lg:items-center mt-3'>
                      <img src={Edit} alt="Edit" className='p-2 lg:p-3 rounded-md w-full h-8 lg:h-12 lg:w-full' onClick={() => HandelEdit(menu.menuId)} style={{ backgroundColor: "#337DCC" }} />
                      <img src={Delete} alt="Delete" className='ms-3 p-2 lg:p-3 w-full h-8 lg:w-full lg:h-12 rounded-md bg-red-500' onClick={() => HandelDelete(menu.menuId)} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>กำลังโหลดข้อมูลเมนู...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default board_Menage;
