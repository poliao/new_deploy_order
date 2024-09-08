import React, { useState, useEffect } from 'react';
import SiteBar_Menage from '../components/SiteBar_Menage';
import Food from '../assets/board/food.png';
import Bar from '../assets/board/bar.svg';
import axios from 'axios';
import { Pagination, Box } from '@mui/material';

export const serviceBoard = () => {
  const [menuData, setMenuData] = useState({ content: [] }); // Set initial structure with content array
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data based on the current page
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/baskets/all', {
        params: {
          page: currentPage - 1, // API uses 0-based indexing for pages
        },
      })
      .then((res) => {
        setMenuData(res.data); // Set the API response to menuData
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [currentPage]);

  // Ensure menuData.content is mapped over
  const allMenuOrders = Array.isArray(menuData.content)
    ? menuData.content // Ensure content is an array
    : [];

  // Calculate pagination based on the total pages returned by the API
  const totalPages = menuData.totalPages || 1;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Map over content for the current page
  const paginatedMenuOrders = allMenuOrders.map((menuItem, menuIndex) => (
    <div key={menuItem.menuId} className="sm:flex p-6 shadow-xl rounded-xl mb-4">
      <div className=" justify-center w-full">
        <div className="w-full sm:flex sm:justify-between">
          <div className="sm:flex sm:items-center">
            <div className="flex justify-center mb-3 sm:mb-0">
              <img
                src={Food}
                alt={menuItem.nameMenu}
                className="rounded-xl w-full object-cover"
              />
            </div>
            <div className="ms-3 text-nowrap">
              <div className="sm:text-2xl text-md mt-3 sm:mt-0 text-nowrap flex justify-center sm:justify-start font-bold">
                {menuItem.nameMenu}
              </div>
              <div className="mt-3 ms-3 text-sm">
                <ul className="list-disc">
                  <li>จำนวน: {menuItem.total}</li>
                  {menuItem.optionsMenu && menuItem.optionsMenu.map((option, optionIndex) => (
                    <li key={option.optionId}>
                      {option.optionName}:
                      {option.optionDetail.map((detail, detailIndex) => (
                        <span key={detail.optionDetailId}>
                          {' '}
                          {detail.optionDetails || 'ไม่มีข้อมูล'}{' '}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full sm:w-1/2 sm:flex-col sm:justify-end gap-3 sm:items-end mt-3 text-white">
            <button
              onClick={() => ChangeStatus(menuItem.menuId)}
              className="w-full py-2 rounded-md sm:w-1/3 blue-back"
            >
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
    console.log(menuid);
  };

  return (
    <div className="board-menage">
      <div className="Main-Navbar rounded-b-2xl shadow-xl sm:hidden ">
        <div className="container-sm">
          <div className="pt-14 pb-10 ">
            <div className="grid justify-stretch">
              <img src={Bar} alt="" />
              <div className="justify-self-center">
                <div>
                  <div className="flex justify-center">เมนู</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <SiteBar_Menage />
        <div className="m-6 bg-white w-full rounded-md p-6">
          <div className="sm:flex hidden justify-between">
            <div className="flex">
              <img src={Bar} alt="" className="me-6 xl:hidden" />
              <div className="text-3xl font-bold ">เมนู</div>
            </div>
          </div>

          {paginatedMenuOrders}

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default serviceBoard;
