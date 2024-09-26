import React, { useEffect, useState } from "react";
import Menu from "../assets/menu-detail/menu.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StarIcon from "@mui/icons-material/Star";
import { API_ROUTES } from "../components/API_share";
import Count from "../components/count";
import axios from "axios";
import { useParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const MenuDetail = () => {
  const [count, setCount] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isBasketAnimating, setIsBasketAnimating] = useState(false); // สำหรับการควบคุมการสั่นของตะกร้า
  const [menuOrders, setMenuOrders] = useState([]);
  const [totalUpdate, setTotalUpdate] = useState(""); // สำหรับเก็บข้อมูลอัปเดตจาก SSE
  const [loading, setLoading] = useState(false);
  const storedtableId = localStorage.getItem("tableId");

  const { menuid } = useParams(); // รับ menuid จาก URL
  const [menudata, setmenudata] = useState({
    namemenu: "",
    price: "",
    detailmenu: "",
    img: "",
    total: "",
    typemenu: "",
    optionsmenu: [],
  });

  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    setLoading(true);
    // เรียก API เพื่อดึงข้อมูลเมนูตาม id
    axios.get(API_ROUTES.API_r + "/admin/menus/" + menuid).then((res) => {
      setmenudata({
        ...menudata,
        namemenu: res.data.namemenu,
        price: res.data.price,
        detailmenu: res.data.detailmenu,
        img: res.data.img,
        total: res.data.total,
        typemenu: res.data.typemenu,
        optionsmenu: res.data.optionsmenu,
      });
      
      setLoading(false);

      if (res.data.total === 0) {
        Swal.fire({
          title: 'ขออภัย',
          text: 'เมนูนี้หมดแล้วค่ะ',
          icon: 'warning',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/home/` + storedtableId; // Refresh the page
          }
        });
      }

      const defaultOptions = {};
      res.data.optionsmenu.forEach((option, index) => {
        if (option.optiondetail.length > 0) {
          defaultOptions[index] = option.optiondetail[0].optiondetails;
        }
      });
      setSelectedOptions(defaultOptions);
      
    });

    const storedMenuOrders =
      JSON.parse(localStorage.getItem("menuOrders")) || [];
    setMenuOrders(storedMenuOrders);

    

    

    // การเชื่อมต่อ SSE โดยใช้ menuid แทนการใช้ชื่อเมนู
    const eventSource = new EventSource(API_ROUTES.API_r+`/admin/menus/subscribe/${menuid}`);

    eventSource.addEventListener("totalUpdate", function (event) {
      setTotalUpdate(event.data); // อัปเดตข้อมูลเมื่อได้รับจากเซิร์ฟเวอร์
      console.log("SSE Update: ", event.data);
      if (event.data === "Remaining total: 0") {
        console.log("หมด");
        Swal.fire({
          title: 'ขออภัย',
          text: 'เมนูนี้หมดแล้วค่ะ',
          icon: 'warning',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/home/` + storedtableId; // Refresh the page
          }
        });
      } else {
        console.log("ยังไม่หมด");
      }
    });
    // ปิดการเชื่อมต่อเมื่อคอมโพเนนต์ถูกทำลาย
    return () => {
      eventSource.close();
    };
    
    
  }, [menuid]);

  const handleOptionChange = (optionIndex, detailValue) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionIndex]: detailValue,
    }));
  };

  const handleAddToBasket = () => {
    const menuOrder = {
      table: {
        tableId: 1,
      },
      menuOrders: [
        {
          status: "กำลังทำ",
          nameMenu: menudata.namemenu,
          img: menudata.img,
          total: count,
          price: menudata.price,
          typemenu: menudata.typemenu,
          optionsMenu: menudata.optionsmenu.map((option, index) => ({
            optionName: option.option_name,
            optionDetail: [
              {
                optionDetails: selectedOptions[index] || "",
              },
            ],
          })),
        },
      ],
    };

    setShowPopup(true);
    setIsBasketAnimating(true);

    setTimeout(() => {
      setShowPopup(false);
      setIsBasketAnimating(false);
    }, 2000);

    const existingOrders = JSON.parse(localStorage.getItem("menuOrders")) || [];
    const updatedOrders = [...existingOrders, menuOrder];

    localStorage.setItem("menuOrders", JSON.stringify(updatedOrders));
    setMenuOrders(updatedOrders);
  };

  return (
    <div className="container-edit">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit"  />
      </Backdrop>
      <div className="menuDetail xl:bg-white relative xl:pb-1 ">
        <div className="absolute">
          {showPopup && (
            <div className="popup-message">
              <div className="popup-content">
                <ShoppingBasketIcon />
                <div className="popup-text ms-3">{menudata.namemenu}</div>
                <div className="checkmark-icon">✔</div>
              </div>
            </div>
          )}
        </div>
        <div>
          {/* แสดงการอัปเดตจาก SSE */}
          {totalUpdate && <div className="sse-update">{totalUpdate}</div>}

          <div className="flex justify-center ">
            <div
              className="btn-add-basket flex justify-center items-center"
              onClick={handleAddToBasket}
            >
              <ShoppingBasketIcon />
              <div className="ms-3">ใส่ตะกร้า</div>
            </div>
          </div>
          <div className="relative">
            <img src={Menu} alt="" className="menu-image" />
            <a>
              <div
                className="box-undo"
                onClick={() => {
                  window.location.href = `/home/${storedtableId}`;
                }}
              >
                <ArrowBackIcon className="text-xl" />
              </div>
            </a>

            <div
              className={`basket-box ${isBasketAnimating ? "animate-basket" : ""
                }`}
            >
              <div className="relative">
                {menuOrders.length > 0 && (
                  <div
                    className="absolute w-5 h-5 orange-back rounded-full text-white flex justify-center items-center"
                    style={{ top: "", right: "-5px" }}
                  >
                    !
                  </div>
                )}

                <a href="/basket">
                  <ShoppingBasketIcon fontSize="large" />
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="star-box px-4 py-2">
                <StarIcon className="yellow-text" />
                <div className="ms-3">4.9</div>
                <div>/5</div>
              </div>
            </div>
          </div>
          <div className="container-sm mt-3 food-detail">
            <div className="title font-bold">{menudata.namemenu}</div>
            <div className="flex justify-between text-xl mt-1">
              <div className="flex gap-2 orange-text ">
                <div className="price">{menudata.price}</div>
                <div>บาท</div>
              </div>
              <div className="ms-3">
                <Count count={count} setCount={setCount} />
              </div>
            </div>
            <div className="mt-3">
              <div className="sub-title ">เกี่ยวกับเมนู</div>
              <div className="detail">{menudata.detailmenu}</div>
            </div>

            <div className="mt-5">
              {menudata.optionsmenu.map((option, index) => (
                <div key={index} className="sub-title">
                  {option.option_name}
                  <div className="mt-3">
                    {option.optiondetail.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex justify-between sub-check mt-3"
                      >
                        <div className="flex items-center text-sm text-gray-500 mb-3 ">
                          {detail.optiondetails}
                        </div>
                        <FormControlLabel
                          control={
                            <Radio
                              id={`option-menu-${index}-${detailIndex}`}
                              value={detail.optiondetails}
                              checked={
                                selectedOptions[index] === detail.optiondetails
                              }
                              onChange={() =>
                                handleOptionChange(index, detail.optiondetails)
                              }
                              style={{ color: "#FF724C" }}
                            />
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
