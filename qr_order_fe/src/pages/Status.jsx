import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Menu from '../assets/menu-detail/menu.png'; // Image is imported here
import FoodBankIcon from '@mui/icons-material/FoodBank';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import  { API_ROUTES } from "../components/API_share";

const Status = () => {
    const [basketData, setBasketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const storedtableId = localStorage.getItem("tableId");
    const tableId = storedtableId;

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await axios.get(API_ROUTES.API_r + `/api/baskets/table/${tableId}`);
                setBasketData(response.data); // `response.data` already contains the JSON parsed result
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMenuData();

        const eventSource = new EventSource(API_ROUTES.API_r + `/api/baskets/table/${tableId}/realtime`);

        eventSource.addEventListener('statusUpdate', (event) => {
            const updatedData = JSON.parse(event.data);

            setBasketData((prevBasketData) => {
                return prevBasketData.map((menu) => {
                    return menu.menuId === updatedData.menuId ? { ...menu, ...updatedData } : menu;
                });
            });
        });

        return () => {
            eventSource.close(); // Ensure the event source is closed on cleanup
        };
    }, [tableId]); // Make sure `tableId` is consistent here

  
    


    return (
        <div className="basket">
            <>
              {/* ส่วนอื่นๆ ของ JSX */}
             

              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </>
            <div className='flex justify-center'>
                <div className='fixed bottom-0 box-monney w-full bg-white xl:w-1/2'>
                    <div className='flex justify-between mb-3'>
                        <div>Vat</div>
                        <div className='orange-text'>฿ 0.00</div>
                    </div>
                    <div className='btn-add-basket flex justify-center items-center' onClick={() => { window.location.href = `/payment` }}>
                        <FoodBankIcon />
                        <div className='ms-3'>ชำระเงิน</div>
                    </div>
                </div>
            </div>
            <div className="shadow-xl rounded-b-2xl">
                <div className="container-sm">
                    <div className="flex pt-14 pb-10 w-full items-center">
                        <div>
                           <a> <ArrowBackIcon className="orange-text" onClick={() => { window.location.href = `/home/${storedtableId}` }} /></a>
                        </div>
                        <div className="flex-1 text-center me-6 font-bold">สถานะอาหาร</div>
                    </div>
                </div>
            </div>

        <div className='container-edit '>
                <div className="container-sm mt-6 ">
                    <div>
                        {Array.isArray(basketData) && basketData.length > 0 ? (
                            basketData.map((menu) => (
                                <div key={menu.menuId} className="flex card-menu mb-3 xl:bg-white">
                                    <img src={Menu} alt=""  />
                                    <div className='flex flex-col justify-between w-full p-2'>
                                        <div className='font-bold'>{menu.nameMenu}</div>
                                        <div className='text-sm'>จำนวนจาน X{menu.total || 'ไม่มีรายละเอียด'}</div>
                                        <ul className='text-sm list-disc ps-4'>
                                            {menu.optionsMenu && menu.optionsMenu.length > 0 ? (
                                                menu.optionsMenu.map((option, index) => (
                                                    <li key={index}>
                                                        {option.optionName}: {option.optionDetail.map(detail => detail.optionDetails).join(', ')}
                                                    </li>
                                                ))
                                            ) : (
                                                <li>ไม่มีตัวเลือก</li>
                                            )}
                                        </ul>
                                        <div className='flex justify-between text-sm'>
                                            <div className='flex gap-2 items-center orange-text'>
                                                <div>{menu.price}</div>
                                                <div>บาท</div>
                                            </div>
                                            <div className={`status-text ${menu.status === 'รอเสิร์ฟ' ? 'text-red-800' : 'text-green-800'}`}>
                                                {menu.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>ไม่มีข้อมูล</div>
                        )}
                    </div>
                </div>
        </div>
        </div>
    );
};

export default Status;
