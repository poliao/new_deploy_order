import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "../assets/menu-detail/menu.png";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const Basket = () => {
  const [mergedItems, setMergedItems] = useState([]);

  useEffect(() => {
    const storedBasket = localStorage.getItem("menuOrders");
    if (storedBasket) {
      const parsedBasket = JSON.parse(storedBasket);
      console.log("Parsed Basket:", parsedBasket);
  
      const newMergedItems = [];
      parsedBasket.forEach((item) => {
        if (
          item.menuOrders &&
          item.menuOrders[0] &&
          item.menuOrders[0].optionsMenu &&
          item.menuOrders[0].optionsMenu[0] &&
          item.menuOrders[0].optionsMenu[0].optionDetail &&
          item.menuOrders[0].optionsMenu[0].optionDetail[0]
        ) {
          const optionDetails = item.menuOrders[0].optionsMenu.map(
            (option) => option.optionDetail[0].optionDetails
          );
  
          const existingItem = newMergedItems.find(
            (mergedItem) =>
              JSON.stringify(mergedItem.optionDetails) ===
              JSON.stringify(optionDetails)
          );
  
          if (existingItem) {
            // หากพบรายการที่มี optionDetails ตรงกัน ให้เพิ่ม total
            existingItem.total += item.menuOrders[0].total;
          } else {
            // หากไม่พบรายการที่ตรงกัน ให้เพิ่มรายการใหม่
            newMergedItems.push({
              optionDetails: optionDetails,
              total: item.menuOrders[0].total,
              nameMenu: item.menuOrders[0].nameMenu,
              price: item.menuOrders[0].price,
            });
            console.log("test", newMergedItems);
          }
        } else {
          // ข้อความแจ้งเตือนเมื่อ item มีโครงสร้างที่ผิดพลาด
          console.warn("Malformed item in basket:", item);
        }
      });
  
      // อัพเดต state ของ mergedItems
      setMergedItems(newMergedItems);
  
      // อัพเดตข้อมูลใน localStorage ด้วยข้อมูลที่รวมกันใหม่
      localStorage.setItem("menuOrders", JSON.stringify(newMergedItems.map(item => ({
        menuOrders: [{
          optionsMenu: item.optionDetails.map(detail => ({
            optionDetail: [{ optionDetails: detail }]
          })),
          total: item.total,
          nameMenu: item.nameMenu,
          price: item.price
        }]
      }))));
    }
  }, []);
  /////////////////////แสดงข้อมูลในการ์ด///////////////////////////////////////
  const updateLocalStorageFromMergedItems = (newMergedItems) => {
    const storedBasket = JSON.parse(localStorage.getItem("menuOrders"));

    storedBasket.forEach((item) => {
      const optionDetails = item.menuOrders[0].optionsMenu.map(
        (option) => option.optionDetail[0].optionDetails
      );

      const matchingMergedItem = newMergedItems.find(
        (mergedItem) =>
          JSON.stringify(mergedItem.optionDetails) === JSON.stringify(optionDetails)
      );

      if (matchingMergedItem) {
        item.menuOrders[0].total = matchingMergedItem.total;
      }
    });

    localStorage.setItem("menuOrders", JSON.stringify(storedBasket));
  };

  const increment = (index) => {
    const updatedItems = [...mergedItems];
    updatedItems[index].total += 1;
    setMergedItems(updatedItems);

    updateLocalStorageFromMergedItems(updatedItems);
  };

  const decrement = (index) => {
    const updatedItems = [...mergedItems];
    if (updatedItems[index].total > 1) {
      updatedItems[index].total -= 1;
      setMergedItems(updatedItems);

      updateLocalStorageFromMergedItems(updatedItems);
    }
  };

  const removeItem = (index) => {
    // ดึงข้อมูลจาก localStorage
    const storedBasket = JSON.parse(localStorage.getItem("menuOrders")) || [];
  
    // กรองรายการที่ไม่ต้องการลบออก
    const updatedBasket = storedBasket.filter((_, i) => i !== index);
  
    // อัพเดตข้อมูลใน localStorage ด้วยข้อมูลที่กรองแล้ว
    localStorage.setItem("menuOrders", JSON.stringify(updatedBasket));
  
    // อัพเดต state ของ mergedItems เพื่อให้ UI สอดคล้องกับข้อมูลใน localStorage
    setMergedItems(updatedBasket.map(item => ({
      optionDetails: item.menuOrders[0].optionsMenu.map(option => option.optionDetail[0].optionDetails),
      total: item.menuOrders[0].total,
      nameMenu: item.menuOrders[0].nameMenu,
      price: item.menuOrders[0].price
    })));
  };
  

  return (
    <div className="basket">
      <div className="flex justify-center">
        <div className="fixed bottom-0 box-monney">
          <div className="flex justify-between mb-3">
            <div>รวม</div>
            <div className="orange-text">฿ 0.00</div>
          </div>
          <div className="btn-add-basket flex justify-center items-center">
            <FoodBankIcon />
            <div className="ms-3">สั่งอาหาร</div>
          </div>
        </div>
      </div>
      <div className="shadow-xl rounded-b-2xl">
        <div className="container-sm">
          <div className="flex pt-14 pb-10 w-full items-center">
            <div>
              <ArrowBackIcon className="orange-text" />
            </div>
            <div className="flex-1 text-center me-6 font-bold">ตะกร้า</div>
          </div>
        </div>
      </div>

      <div className="container-sm mt-6">
        <div>
          {mergedItems.map((item, index) => (
            <div className="flex card-menu mb-3" key={index}>
              <img src={Menu} alt="" className="object-cover" />
              <div className="flex flex-col justify-between w-full p-2">
                <div className="flex justify-between">
                  <div className="font-bold">{item.nameMenu}</div>
                  <div>
                    {" "}
                    <button
                      className="bg-red-500 text-white p-1 rounded-md"
                      onClick={() => removeItem(index)}
                    >
                      <DeleteIcon sx={{ fontSize: 24 }} />
                    </button>
                  </div>
                </div>
                <ul className="text-sm list-disc ps-4">
                  {item.optionDetails.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
                <div className="flex justify-between text-sm">
                  <div className="flex gap-2 items-center orange-text">
                    <div>{item.total * item.price}</div>
                    <div>บาท</div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <button
                        className="rounded-md"
                        style={{
                          border: "1px solid #C5C5C5",
                          width: "28px",
                          height: "28px",
                        }}
                        onClick={() => decrement(index)}
                      >
                        -
                      </button>
                      <div className="mx-3">{item.total}</div>
                      <button
                        className="rounded-md orange-text"
                        style={{
                          border: "1px solid #FF724C",
                          width: "28px",
                          height: "28px",
                        }}
                        onClick={() => increment(index)}
                      >
                        +
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
  );
};

export default Basket;