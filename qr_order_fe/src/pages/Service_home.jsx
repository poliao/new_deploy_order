import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Search from "../assets/topMenu-img/search.svg";
import Table from "../assets/navbar-img/table.svg";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';

import Bar from "../assets/board/bar.svg";
import EditIcon from '@mui/icons-material/Edit';
import logo from '../assets/logo.png'
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
import Swal from "sweetalert2";
import LogoutIcon from '@mui/icons-material/Logout';
import InsightsIcon from '@mui/icons-material/Insights';

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
const ServiceHome = () => {
  const [tables, setTables] = useState([]);
  const [qrValue, setQrValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle the boolean state
  };


  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("token") === null) {
      window.location.href = "/Login";
    }

    const fetchTables = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ROUTES.API_r + "/api/tables");
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


   

    fetchTables();

    setLoading(false);
  }, []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (tableId) => {
    setQrValue(API_ROUTES.QR_Code + "/home/" + tableId);
    setOpen(true);

    axios
      .put(
        API_ROUTES.API_r +
        "/api/tables/updateStatus/" +
        tableId +
        "?status=ไม่ว่าง",
        {}
      )
      .then((response) => { });
  };

  const handleOpenTable = (tableId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการให้โต๊ะว่างไหม",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            API_ROUTES.API_r +
            "/api/tables/updateStatus/" +
            tableId +
            "?status=ว่าง",
            {}
          )
          .then((response) => { });
        Swal.fire("โต๊ะว่างแล้ว", "คุณแก้ไขให้โต๊ะว่างแล้ว", "success");
        window.location.reload();
      } else {
        Swal.fire("ยกเลิก", "คุณยกเลิกการแก้ไข", "error");
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // Filter tables based on search query
  const filteredTables = tables.filter((table) =>
    table.tableName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Login";
  };



  return (
    <div>
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
          "& .MuiDialogActions-root": {
            button: {
              color: "red",
              fontWeight: "bold",
              fontSize: "16px",
              border: "1px solid red",
              padding: "10px 20px",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Qr Code"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <QRCodeCanvas value={qrValue} size={256} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ปิดหน้าต่าง</Button>
        </DialogActions>
      </Dialog>

      {isSidebarVisible && (
        <div id="sidebar">
          {/* Sidebar content */}
          <div className="h-full w-3/4 sm:w-2/3  z-10 bg-white sm:p-10 p-5 pt-10 fixed">
            <div className="flex justify-end"> <img src={Bar} alt="" className="w-8" onClick={() => handleSidebar()} /></div>
            <div className="mt-20 font-bold ">
              <ul className="text-sm sm:text-base">
                <li className="gap-3 flex mb-5 orange-back p-3 text-white rounded-md shadow-md">
                  <HomeIcon />
                  <div>หน้าหลัก</div>
                </li>
                <li className="gap-3 flex mb-5 border-b-2 pb-3" onClick={() => window.location.href = "/boardService"}>
                  <EditIcon />
                  <div>จัดการเมนู</div>
                </li>
                <li className="gap-3 flex mb-5 border-b-2 pb-3" onClick={() => window.location.href = "/report"}>
                  <InsightsIcon />
                  <div>กระดานสรุปยอด</div>
                </li>
                <li className="gap-3 flex " onClick={() => handleLogout()} >
                  <LogoutIcon />
                  <div> ออกจากระบบ</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-b-2xl shadow-xl bg-white mb-4">
        <div className="container-sm xl:px-10">
          <div className="pt-14 pb-10">
            <div className="flex justify-between">
              <div className="lg:hidden flex items-center">
                <img src={Bar} alt="" className="w-8" onClick={() => handleSidebar()} />
              </div>
              <div className="hidden lg:flex items-center gap-3 ">
                <img src={logo} alt="" className="w-10" />
                <div className="font-bold flex items-end whitespace-nowrap">
                  ระบบจัดการโต๊ะ
                </div>
              </div>
              <div className="flex">
                <button className="lg:flex hidden font-bold items-center orange-back border-2 rounded-md text-white px-6 py-3" onClick={() => window.location.href = "/boardService"}>
                  <EditIcon />
                  <div className="ms-2 hidden sm:block">จัดการเมนู</div>
                </button>
                <button className="font-bold lg:flex hidden ms-3 items-center border-yellow-500 border-2 rounded-md text-yellow-500 px-6 py-3" onClick={() => window.location.href = "/report "}>
                  <InsightsIcon />
                  <div className="ms-2 hidden sm:block">กระดานสรุปยอด</div>
                </button>
                <button className="font-bold lg:flex hidden ms-3 items-center border-red-500 border-2 rounded-md text-red-500 px-6 py-3" onClick={() => handleLogout()}>
                  <LogoutIcon />
                  <div className="ms-2 hidden sm:block">ออกจากระบบ</div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="container-edit ">
        <div className="lg:bg-white py-4">
          <div className="container-sm ">
            <div className="flex">
              <input
                type="text"
                className="w-full py-2 ps-5 rounded-md xl:border-y-2 xl:border-s-2 xl:bg-gray-100"
                aria-label="search"
                title="search"
                placeholder="ค้นหา"
                value={searchQuery} // Bind input value to searchQuery
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
              <button className="p-2 px-3 orange-back rounded-md">
                <img src={Search} alt="" />
              </button>
            </div>
          </div>

          {/* Category Swiper */}
          <div
            className="category text-base mt-5"
            style={{ paddingLeft: "12px" }}
          >
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
                  <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md xl:shadow-lg xl:border-2 xl:bg-gray-100">
                    <img src={MainFood} alt="" />
                    <div className="ms-3 font-bold">จานหลัก</div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md xl:shadow-lg xl:border-2 xl:bg-gray-100">
                    <img src={Water} alt="" />
                    <div className="ms-3 font-bold">น้ำ</div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md xl:shadow-lg xl:border-2 xl:bg-gray-100">
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
                <div className="yellow-back yellow-glow rounded-xl me-2.5 w-full md:h-36 relative">
                  <img
                    src={Popular1}
                    className="absolute lg:w-30"
                    style={{
                      top: "-20px",
                      left: "50%",
                      transform: "translate(-50%, 0)",
                    }}
                    alt=""
                  />
                  <div className="relative p-1.5" style={{ top: "70px" }}>
                    <div className="font-bold text-white whitespace-nowrap md:text-base text-xs lg:text-lg">
                      พานาคอตต้าเสาวรส
                    </div>
                    <div className="flex justify-between items-center">
                      <div className=" text-white text-xs lg:text-sm">120</div>
                      <div>
                        <img src={Errow} alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="yellow-back yellow-glow rounded-xl me-2.5 w-full md:h-36 relative">
                  <img
                    src={Popular2}
                    className="absolute lg:w-30"
                    style={{
                      top: "-20px",
                      left: "50%",
                      transform: "translate(-50%, 0)",
                    }}
                    alt=""
                  />
                  <div className="relative p-1.5" style={{ top: "70px" }}>
                    <div className="font-bold text-white whitespace-nowrap text-xs md:text-base lg:text-lg">
                      พานาคอตต้าเสาวรส
                    </div>
                    <div className="flex justify-between items-center">
                      <div className=" text-white text-xs lg:text-sm">120</div>
                      <div>
                        <img src={Errow} alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="yellow-back yellow-glow rounded-xl w-full md:h-36 relative"
                  style={{ minHeight: "115px" }}
                >
                  <img
                    src={Popular3}
                    className="absolute lg:w-30"
                    style={{
                      top: "-20px",
                      left: "50%",
                      transform: "translate(-50%, 0)",
                    }}
                    alt=""
                  />
                  <div className="relative p-1.5" style={{ top: "70px" }}>
                    <div className="font-bold text-white whitespace-nowrap text-xs md:text-base lg:text-lg">
                      พานาคอตต้าเสาวรส
                    </div>
                    <div className="flex justify-between items-center">
                      <div className=" text-white text-xs lg:text-sm">120</div>
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
              <div className="mt-3">
                {filteredTables.length > 0 ? (
                  filteredTables.map((table, index) => (
                    <div className="mb-2" key={index}>
                      <div className="flex bg-white shadow-md rounded-xl">
                        <div className="relative w-full sm:w-1/3  ">
                          <a
                            onClick={() => handleClickOpen(table.tableId)}
                            className="absolute top-0 left-0 text-white bg-black w-full bg-opacity-50 h-full flex justify-center items-center rounded-s-xl "
                          >
                            กดดู Qr Code
                          </a>
                          <img
                            src={TableService}
                            alt=""
                            className="rounded-s-xl object-cover w-full"
                          />
                        </div>
                        <div className="p-3 w-full flex flex-col justify-between">
                          <div>
                            <div className="font-bold lg:text-lg">
                              {table.tableName}
                            </div>
                            <div className="text-xs md:text-sm lg:text-sm">
                              {table.description}
                            </div>
                          </div>
                          <div className="flex justify-end mt-3">
                            <div className="flex items-end">
                              <button
                                className={`rounded-md px-5 py-1 text-xs md:text-sm lg:text-sm ${table.status === "ว่าง"
                                    ? "bg-green-700"
                                    : "bg-red-700"
                                  } text-white`}
                                onClick={() => handleOpenTable(table.tableId)}
                              >
                                {table.status === "ว่าง" ? "ว่าง" : "ไม่ว่าง"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>ไม่พบข้อมูลโต๊ะที่ค้นหา</p> // Message when no tables match the search
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHome;
