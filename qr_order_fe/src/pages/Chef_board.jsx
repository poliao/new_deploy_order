import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Bar from "../assets/board/bar.svg";
import axios from "axios";
import { Pagination, Box } from "@mui/material";
import { API_ROUTES } from "../components/API_share";
import { parseJwt } from "../components/decodeing";

import LogoutIcon from '@mui/icons-material/Logout';

import NavbarService from "../components/Navbar_service";


export const serviceBoard = () => {
  const [menuData, setMenuData] = useState({ content: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ฟังก์ชันสำหรับรับข้อมูลเรียลไทม์ผ่าน SSE
  useEffect(() => {
    const eventSource = new EventSource(API_ROUTES.API_r + "/api/baskets/realtime");
  
    eventSource.addEventListener("newOrder", (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log("Received new order (newOrder event):", parsedData);
  
        setMenuData((prevMenuData) => {
          // ตรวจสอบว่ามีข้อมูลในหน้านั้นครบ 5 รายการหรือยัง
          if (prevMenuData.content.length < 5) {
            const updatedContent = [parsedData, ...prevMenuData.content]; // เพิ่มข้อมูลใหม่
  
            // เรียงข้อมูลตาม menuId จากน้อยไปมาก
            updatedContent.sort((a, b) => a.menuId - b.menuId);
  
            return {
              ...prevMenuData,
              content: updatedContent, // อัปเดตข้อมูลที่เรียงแล้ว
            };
          }
  
          // ถ้ามีข้อมูลครบ 5 แล้ว ไม่ต้องเพิ่มข้อมูลใหม่
          return prevMenuData;
        });
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    });
  
    eventSource.onerror = (error) => {
      console.error("Error in SSE connection:", error);
      eventSource.close(); // ปิดการเชื่อมต่อเมื่อเกิดข้อผิดพลาด
    };
  
    return () => {
      eventSource.close(); // ปิดการเชื่อมต่อเมื่อ component ถูก unmount
    };
  }, []);
  
  
  

  // ฟังก์ชันสำหรับดึงข้อมูลเมนูในหน้าปัจจุบัน
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/Login";
    }
    if (localStorage.getItem("token")) {
      const decoded = parseJwt(localStorage.getItem("token"));
      if (decoded.role !== "chef") {
        window.location.href = "/login";
      }
    } else {
      setError("No token found in response");
    }
    

    axios
      .get(API_ROUTES.API_r + "/api/baskets/all", {
        params: {
          page: currentPage - 1,
        },
      })
      .then((res) => {
        setMenuData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [currentPage]);

  const allMenuOrders = Array.isArray(menuData.content) ? menuData.content : [];

  const totalPages = menuData.totalPages || 1;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Login";
  };

  const paginatedMenuOrders = allMenuOrders.map((menuItem) => (
    <div key={menuItem.menuId} className="sm:flex p-6 shadow-md rounded-xl mb-4 bg-white">
      <div className="justify-center w-full">
        <div className="w-full sm:flex sm:justify-between">
          <div className="sm:flex sm:items-center">
            <div className="ms-3 text-nowrap">
              <div className="sm:text-2xl text-md mt-3 sm:mt-0 text-nowrap flex justify-center sm:justify-start font-bold">
                {menuItem.nameMenu}
              </div>
              <div className="mt-3 ms-3 text-sm">
                <ul className="list-disc">
                  <li>จำนวน: {menuItem.total}</li>
                  {menuItem.optionsMenu &&
                    menuItem.optionsMenu.map((option) => (
                      <li key={option.optionId}>
                        {option.optionName}:
                        {option.optionDetail.map((detail) => (
                          <span key={detail.optionDetailId}>
                            {" "}
                            {detail.optionDetails || "ไม่มีข้อมูล"}{" "}
                          </span>
                        ))}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full sm:w-1/2 sm:flex-col sm:justify-end gap-3 sm:items-end mt-3 text-white">
            <button onClick={() => ChangeStatus(menuItem.menuId)} className="w-full py-2 rounded-md sm:w-1/3 blue-back">
              เริ่มเตรียม
            </button>
            <button className="orange-back w-full py-2 sm:w-1/3 rounded-md">
              แจ้งลูกค้า
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  const ChangeStatus = (menuid) => {
    axios.put(API_ROUTES.API_r + "/api/baskets/" + menuid + "/status?status=รอเสิร์ฟ")
      .then(() => {
        Swal.fire({
          title: 'เรียบร้อย',
          text: 'เมนูเสร็จสิ้นแล้ว',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Refresh the page
          }
        });
       
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        // Optionally show an error message to the user
      });
  };

  return (
    <div className="board-menage">
      <NavbarService title="ระบบดูรายการอาหาร" />
      <div className="container-edit">
        <div className="Main-Navbar rounded-b-2xl shadow-xl sm:hidden ">
          <div className="container-sm">
            <div className="pt-14 pb-10 ">
              <div className="flex justify-between ">
                <img src={Bar} alt="" className="" />
                <div className="flex  items-end">
                  <div className="ms-10">เมนู</div>
                </div>
                <div className="flex ">
                  <button className="font-bold flex  items-center border-red-500 border-2 rounded-md text-red-500 px-6 py-3" onClick={() => handleLogout()}>
                    <LogoutIcon />
                    <div className="ms-2 hidden sm:block">ออกจากระบบ</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="m-6 w-full rounded-md p-6">
            <div className="sm:flex hidden justify-center bg-white p-3 mb-3 rounded-md ">
              <div className="flex">
                <div className="text-2xl font-bold">เมนู</div>
              </div>
            </div>

            {paginatedMenuOrders}

            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serviceBoard;
