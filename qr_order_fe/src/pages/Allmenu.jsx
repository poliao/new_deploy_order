import React, { useState, useEffect } from 'react';
import NavbarCategory from '../components/NavbarCategory';
import MenuCard from '../components/MenuCard';
import { API_ROUTES } from "../components/API_share";
import Search from "../assets/topMenu-img/search.svg";
import axios from "axios";

const Allmenu = () => {
    const [menu, setMenu] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // New state for search input
    const [totalUpdates, setTotalUpdates] = useState({});

    useEffect(() => {
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

    // Filter the menu based on the search query
    const filteredMenu = menu.filter(item =>
      item.namemenu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailmenu.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div >
            <NavbarCategory title="อาหารทั้งหมด" />

            <div className="mt-36">
                <div className="flex" style={{ paddingLeft: "12px" }}>
                    <input
                      type="text"
                      className="w-full py-2 ps-5 rounded-md xl:border-y-2 xl:border-s-2 xl:bg-gray-100"
                      aria-label="search"
                      title="search"
                      placeholder="ค้นหา"
                      value={searchQuery} // Bind the input value to the search query state
                      onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                    />
                    
                    <button className="p-2 px-3 orange-back rounded-md">
                      <img src={Search} alt="Search" />
                    </button>
                </div>
            </div>

            <div className='container-sm container-edit'>
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
    );
}

export default Allmenu;
