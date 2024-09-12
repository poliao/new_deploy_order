import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Search from "../assets/topMenu-img/search.svg";
import Table from '../assets/navbar-img/table.svg'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import MainFood from "../assets/topMenu-img/main-food.svg";
import Water from "../assets/topMenu-img/water.svg";
import Dessert from "../assets/topMenu-img/dessert.svg";
import Crown from "../assets/topMenu-img/crown.svg";
import Popular1 from "../assets/topMenu-img/popular1.png";
import Popular2 from "../assets/topMenu-img/popular2.png";
import Popular3 from "../assets/topMenu-img/popular3.png";
import Errow from "../assets/topMenu-img/errow-right.svg";
import TableService from "../assets/service-home/table-service.png";
import { API_ROUTES } from "../components/API_share";
import { QRCodeCanvas } from "qrcode.react";

const ServiceHome = () => {
    const [tables, setTables] = useState([]);
    const [qrValue, setQrValue] = useState("https://www.youtube.com/watch?v=lFpUBMKN4jM");

    // Fetch data from API
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            window.location.href = "/Login";
        }
        const fetchTables = async () => {
            try {
                const response = await fetch(API_ROUTES.API_r+'/api/tables');
                const data = await response.json();
                console.log(data); // Log the response data
                setTables(data); // Set the fetched data to the state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTables();
    }, []);

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (tableId) => {
    console.log(tableId);
    setQrValue("https://new-deploy-order.onrender.com/home/"+tableId)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    return (
        <div >
                 <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Qr Code"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <QRCodeCanvas value={qrValue} size={256} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ปิดหน้าต่าง</Button>
         
        </DialogActions>
      </Dialog>
            
            <div className='rounded-b-2xl shadow-xl bg-white mb-4 '>
                <div className='container-sm'>
                    <div className='pt-14 pb-10'>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <img src={Table} className='me-3' alt="table" />
                                <div className='font-bold flex items-end whitespace-nowrap'>ระบบจัดการโต๊ะ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          <div className="container-edit">
                <div className="container-sm ">
                    <div className="flex">
                        <input
                            type="text"
                            className="w-full py-2 ps-5 rounded-md"
                            aria-label="search"
                            title="search"
                            placeholder="ค้นหา"
                        />
                        <button className="p-2 px-3 orange-back rounded-md">
                            <img src={Search} alt="" />
                        </button>
                    </div>
                </div>
    
                {/* Category Swiper */}
                <div className="category text-base mt-5" style={{ paddingLeft: "12px" }}>
                    <div className="font-bold">หมวดหมู่</div>
                    <div className="mt-2">
                        <Swiper
                            style={{ overflow: "hidden" }}
                            spaceBetween={10}
                            slidesPerView={2.7}
                            onSlideChange={() => console.log("slide change")}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide>
                                <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md">
                                    <img src={MainFood} alt="" />
                                    <div className="ms-3 font-bold">จานหลัก</div>
                                </div>
                            </SwiperSlide>
    
                            <SwiperSlide>
                                <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md">
                                    <img src={Water} alt="" />
                                    <div className="ms-3 font-bold">น้ำ</div>
                                </div>
                            </SwiperSlide>
    
                            <SwiperSlide>
                                <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md">
                                    <img src={Dessert} alt="" />
                                    <div className="ms-3 font-bold">ของหวาน</div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
    
                {/* Popular Items */}
                <div className="popular mt-5">
                    <div className="container-sm">
                        <div className="flex justify-center items-center">
                            <div>
                                <img src={Crown} alt="" className="pb-1" />
                            </div>
                            <div className="font-bold ms-1">ยอดนิยม</div>
                        </div>
                        <div className="flex mt-6">
                            <div className="yellow-back yellow-glow rounded-xl me-2.5 w-full relative">
                                <img
                                    src={Popular1}
                                    className="absolute lg:w-40"
                                    style={{ top: "-20px", left: "50%", transform: "translate(-50%, 0)" }}
                                    alt=""
                                />
                                <div className="relative p-1.5" style={{ top: "70px" }}>
                                    <div className="font-bold text-white whitespace-nowrap md:text-base  text-xs  lg:text-lg">
                                        พานาคอตต้าเสาวรส
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className=" text-white  text-xs lg:text-sm">120</div>
                                        <div>
                                            <img src={Errow} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="yellow-back yellow-glow rounded-xl me-2.5 w-full relative">
                                <img
                                    src={Popular2}
                                    className="absolute lg:w-40"
                                    style={{ top: "-20px", left: "50%", transform: "translate(-50%, 0)" }}
                                    alt=""
                                />
                                <div className="relative p-1.5" style={{ top: "70px" }}>
                                    <div className="font-bold text-white whitespace-nowrap text-xs  md:text-base  lg:text-lg">
                                        พานาคอตต้าเสาวรส
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className=" text-white  text-xs lg:text-sm">120</div>
                                        <div>
                                            <img src={Errow} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="yellow-back yellow-glow rounded-xl w-full  relative" style={{ minHeight: "115px" }}>
                                <img
                                    src={Popular3}
                                    className="absolute lg:w-40"
                                    style={{ top: "-20px", left: "50%", transform: "translate(-50%, 0)" }}
                                    alt=""
                                />
                                <div className="relative p-1.5" style={{ top: "70px" }}>
                                    <div className="font-bold text-white whitespace-nowrap  text-xs  md:text-base lg:text-lg">
                                        พานาคอตต้าเสาวรส
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className=" text-white  text-xs lg:text-sm">120</div>
                                        <div>
                                            <img src={Errow} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Table Items */}
                <div className="menu mt-5">
                    <div className="container-sm">
                        <div className="flex justify-between items-center">
                            <div className="font-bold">รายการโต๊ะอาหาร</div>
                            <div className="text-xs orange-text ">ดูทั้งหมด</div>
                        </div>
                        <div className="mt-3" >
                            {tables.map((table, index) => (
                                <div className="mb-2" key={index} onClick={() => handleClickOpen(table.tableId)}>
                                    <div
                                        className="flex bg-white shadow-md rounded-xl "
                                       
                                    >
                                        <img src={TableService} alt="" className="rounded-s-xl" />
                                        <div className="p-3 w-full flex flex-col justify-between">
                                            <div>
                                                <div className="font-bold lg:text-lg">{table.tableName}</div>
                                                <div className="text-xs md:text-sm lg:text-sm">
                                                    {table.description}
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-3">
                                                <div className="flex items-end">
                                                    <button className="rounded-md px-5 py-1 text-xs md:text-sm lg:text-sm bg-green-700 text-white">
                                                        {table.status === "ว่าง" ? "ว่าง" : "ไม่ว่าง"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
          </div>
        </div>
    );
}

export default ServiceHome;
