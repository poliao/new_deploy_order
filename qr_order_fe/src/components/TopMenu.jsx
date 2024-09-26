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
import MenuCard from "../components/MenuCard";
import { API_ROUTES } from "./API_share";

const TopMenu = () => {
  const [menu, setMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const [totalUpdates, setTotalUpdates] = useState({});


  useEffect(() => {


    // Fetch menu items
    axios.get(API_ROUTES.API_r + "/admin/menus")
      .then((res) => {
        setMenu(res.data);

        // Create EventSource for each menuId
        const eventSources = res.data.map((item) => {
          const eventSource = new EventSource(API_ROUTES.API_r + `/admin/menus/subscribe/${item.menuId}`);

          eventSource.addEventListener("totalUpdate", (event) => {
            setTotalUpdates((prev) => ({
              ...prev,
              [item.menuId]: event.data // Store updates in the state using menuId as key
            }));

            item.total = event.data; 
           

            
            

            console.log(`SSE Update for menuId ${item.menuId}: ${event.data}`);
          });

          return eventSource;
        });

        // Cleanup function to close all EventSources on component unmount
        return () => {
          eventSources.forEach(source => source.close());
        };
      })
      .catch((err) => console.log(err));
  }, []);

  const ClickGetId = (id) => {
    window.location.href = `/menuDetail/${id}`;
  };

  const ClickCategory = (nameCategory) => {
    window.location.href = `/category/${nameCategory}`;
  };

  // Filter the menu based on the search query
  const filteredMenu = menu
    ? menu.filter((item) =>

      item.namemenu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailmenu.toLowerCase().includes(searchQuery.toLowerCase()) 




    )

    : [];



  return (
    <div className="Top-Menu container-edit">
      <div className="xl:bg-white xl:p-2 xl:pt-5">
        <div className="">
          <div className="flex" style={{ paddingLeft: "12px" }}>
            <input
              type="text"
              className="w-full py-2 ps-5 rounded-md xl:border-y-2 xl:border-s-2 xl:bg-gray-100"
              aria-label="search"
              title="search"
              placeholder="ค้นหา"
              value={searchQuery} // Bind the input value to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />

            <button className="p-2 px-3 orange-back rounded-md">
              <img src={Search} alt="Search" />
            </button>
          </div>
        </div>

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
                <a>
                  <div
                    onClick={() => ClickCategory("MainFood")}
                    className="flex items-center justify-center bg-white py-3 px-2 rounded-md xl:shadow-lg xl:border-2 xl:bg-gray-100"
                  >
                    <img src={MainFood} alt="Main Food" />
                    <div className="ms-3 font-bold text-nowrap">จานหลัก</div>
                  </div>
                </a>
              </SwiperSlide>

              <SwiperSlide>
                <a>
                  <div
                    onClick={() => ClickCategory("Water")}
                    className="flex items-center justify-center bg-white py-3 px-2 rounded-md xl:shadow-lg xl:border-2 xl:bg-gray-100"
                  >
                    <img src={Water} alt="Water" />
                    <div className="ms-3 font-bold text-nowrap">น้ำ</div>
                  </div>
                </a>
              </SwiperSlide>

              <SwiperSlide>
                <a>
                  <div
                    onClick={() => ClickCategory("Dessert")}
                    className="flex items-center justify-center bg-white py-3 px-2 rounded-md xl:shadow-lg xl:border-2 xl:bg-gray-100"
                  >
                    <img src={Dessert} alt="Dessert" className="w-8" />
                    <div className="ms-3 font-bold text-nowrap">ของหวาน</div>
                  </div>

                </a>
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
              <div className="yellow-back yellow-glow rounded-xl me-2.5 w-full md:h-36 relative">
                <img
                  src={Popular1}
                  className="absolute lg:w-38"
                  style={{
                    top: "-20px",
                    left: "50%",
                    transform: "translate(-50%, 0)",
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

              <div className="yellow-back yellow-glow rounded-xl me-2.5 w-full relative">
                <img
                  src={Popular2}
                  className="absolute lg:w-38"
                  style={{
                    top: "-20px",
                    left: "50%",
                    transform: "translate(-50%, 0)",
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
                  className="absolute lg:w-38"
                  style={{
                    top: "-20px",
                    left: "50%",
                    transform: "translate(-50%, 0)",
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
          <div className="container-sm ">
            <div className="flex justify-between items-center">
              <div className="font-bold">รายการอาหาร</div>
              <a href="/allmenu">
                <div className="text-xs orange-text">ดูทั้งหมด</div>
              </a>
            </div>
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <div className="relative" key={item.menuId}>
                  {(totalUpdates[item.menuId] === "Remaining total: 0" || item.total === 0) && (
                    <div className="absolute bg-black w-full h-full rounded-md bg-opacity-50 text-white flex justify-center items-center">
                      เมนูนี้หมดแล้ว
                    </div>
                  )}
                  <MenuCard
                    name={item.namemenu}
                    detail={item.detailmenu}
                    onClick={() => ClickGetId(item.menuId)}
                    price={`${item.price} บาท`}
                  />
                </div>
              ))
            ) : (
              <p>ไม่มีเมนูอาหาร</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
