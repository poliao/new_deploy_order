import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";

import Search from "../assets/topMenu-img/search.svg";
import MainFood from "../assets/topMenu-img/main-food.svg";
import Water from "../assets/topMenu-img/water.svg";
import Dessert from "../assets/topMenu-img/dessert.svg";
import Crown from "../assets/topMenu-img/crown.svg";
import Popular1 from "../assets/topMenu-img/popular1.png";
import Popular2 from "../assets/topMenu-img/popular2.png";
import Popular3 from "../assets/topMenu-img/popular3.png";
import Errow from "../assets/topMenu-img/errow-right.svg";
import Menu1 from "../assets/topMenu-img/menu-1.png";

import MenuCard from "../components/MenuCard";

const TopMenu = () => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/menus")
      .then((res) => {
        setMenu(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const ClickGetId = (id) => {
    window.location.href = `/menuDetail/${id}`;
    
  };

  const ClickCategory = (nameCategory) => {
    window.location.href = `/category/${nameCategory}`
  };

  return (
    <div className="Top-Menu py-5">
      <div className="container-sm">
        <div className="flex">
          <input
            type="text"
            className="w-full py-2 ps-5 rounded-md"
            aria-label="search"
            title="search"
            placeholder="ค้นหา"
          />
          <button className="p-2 px-3 orange-back rounded-md">
            <img src={Search} alt="Search" />
          </button>
        </div>
      </div>

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
              <div onClick={() => ClickCategory("MainFood")} className="flex items-center justify-center bg-white py-3 px-2 rounded-md">
                <img src={MainFood} alt="Main Food" />
                <div className="ms-3 font-bold">จานหลัก</div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div  onClick={() => ClickCategory("Water")}  className="flex items-center justify-center bg-white py-3 px-2 rounded-md">
                <img src={Water} alt="Water" />
                <div className="ms-3 font-bold">น้ำ</div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div  onClick={() => ClickCategory("Dessert")}  className="flex items-center justify-center bg-white py-3 px-2 rounded-md">
                <img src={Dessert} alt="Dessert" />
                <div className="ms-3 font-bold">ของหวาน</div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="popular mt-5">
        <div className="container-sm">
          <div className="flex justify-center items-center">
            <div>
              <img src={Crown} alt="Crown" className="pb-1" />
            </div>
            <div className="font-bold ms-1">ยอดนิยม</div>
          </div>
          <div className="flex mt-6">
            <div
              className="yellow-back yellow-glow rounded-xl me-2.5 w-full relative"
            >
              <img
                src={Popular1}
                className="absolute lg:w-40"
                style={{
                  top: "-20px",
                  left: "50%",
                  transform: "translate(-50%, 0)"
                }}
                alt="Popular 1"
              />
              <div className="relative p-1.5" style={{ top: "70px" }}>
                <div className="font-bold text-white whitespace-nowrap md:text-base text-xs lg:text-lg">
                  พานาคอตต้าเสาวรส
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white text-xs lg:text-sm">120</div>
                  <div>
                    <img src={Errow} alt="Arrow" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="yellow-back yellow-glow rounded-xl me-2.5 w-full relative"
            >
              <img
                src={Popular2}
                className="absolute lg:w-40"
                style={{
                  top: "-20px",
                  left: "50%",
                  transform: "translate(-50%, 0)"
                }}
                alt="Popular 2"
              />
              <div className="relative p-1.5" style={{ top: "70px" }}>
                <div className="font-bold text-white whitespace-nowrap text-xs md:text-base lg:text-lg">
                  พานาคอตต้าเสาวรส
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white text-xs lg:text-sm">120</div>
                  <div>
                    <img src={Errow} alt="Arrow" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="yellow-back yellow-glow rounded-xl w-full relative"
              style={{ minHeight: "115px" }}
            >
              <img
                src={Popular3}
                className="absolute lg:w-40"
                style={{
                  top: "-20px",
                  left: "50%",
                  transform: "translate(-50%, 0)"
                }}
                alt="Popular 3"
              />
              <div className="relative p-1.5" style={{ top: "70px" }}>
                <div className="font-bold text-white whitespace-nowrap text-xs md:text-base lg:text-lg">
                  พานาคอตต้าเสาวรส
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white text-xs lg:text-sm">120</div>
                  <div>
                    <img src={Errow} alt="Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu mt-5">
        <div className="container-sm">
          <div className="flex justify-between items-center">
            <div className="font-bold">รายการอาหาร</div>
            <a href="/allmenu"><div className="text-xs orange-text">ดูทั้งหมด</div></a>
          </div>
          {menu && menu.length > 0 && menu.map((item, index) => (
            <MenuCard  
              key={index}
              name={item.namemenu}
              detail={item.detailmenu}
              onClick={() => ClickGetId(item.menuId)}
              price={`${item.price} บาท`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
