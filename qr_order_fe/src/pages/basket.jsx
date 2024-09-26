import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "../assets/menu-detail/menu.png";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_ROUTES } from "../components/API_share";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';


const Basket = () => {
  const [mergedItems, setMergedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const storedtableId = localStorage.getItem("tableId");


  const PostOrder = () => {

    if (localStorage.getItem("menuOrders") === null) {
      console.log("ไม่มีข้อมูล")
      Swal.fire({
        icon: 'warning',
        title: 'ไม่มีรายการสั่งซื้อ',
        text: 'คุณยังไม่ได้เพิ่มรายการสั่งซื้อใดๆ',
        confirmButtonText: 'ตกลง'
      });
    } else {
      const postOrderWithRetry = async (item) => {
        let success = false;
        while (!success) {
          try {
            const orderData = {
              status: item.status,
              nameMenu: item.nameMenu,
              detailMenu: item.detailMenu,
              img: item.img,
              price: item.price,
              total: item.total,
              typemenu: item.typemenu,
              optionsMenu: item.optionsMenu.map((option) => ({
                optionName: option.optionName,
                optionDetail: option.optionDetail.map((detail) => ({
                  optionDetails: detail.optionDetails,
                })),
              })),
              table: {
                tableId: storedtableId,
              },
            };

            console.log("Order Data:", orderData);

            // ส่งคำสั่งอาหารไปยังเซิร์ฟเวอร์
            const response = await axios.post(`${API_ROUTES.API_r}/api/baskets/create`, orderData);
            console.log("Order sent for item:", item.nameMenu);
            console.log(response.data);

            // อัปเดตจำนวนเมนูที่เหลือ
            await axios.post(
              `${API_ROUTES.API_r}/admin/menus/updateTotal?namemenu=${item.nameMenu}&newTotal=${item.total}`
            );

            success = true; // ถ้าสำเร็จให้เปลี่ยน success เป็น true
          } catch (error) {
            console.error("Error occurred, retrying in 3 seconds...", error);
            await new Promise(resolve => setTimeout(resolve)); // รอ 3 วินาที
          }
        }
      };

      setLoading(true);

      // ใช้ Promise.all เพื่อรอให้ทุกคำสั่งทำงานเสร็จก่อน
      Promise.all(mergedItems.map((item) => postOrderWithRetry(item)))
        .then(() => {
          // ลบรายการออกจาก localStorage
          localStorage.removeItem("menuOrders");
          // เปลี่ยนหน้าไปหน้า home หลังจากส่งข้อมูลทั้งหมดสำเร็จ
          window.location.href = `/home/${storedtableId}`;
          // ไม่จำเป็นต้องซ่อน Backdrop ที่นี่ เพราะหน้าจะถูกโหลดใหม่
        })
        .catch((error) => {
          console.error("Error in completing all requests", error);
          // ซ่อน Backdrop เมื่อเกิดข้อผิดพลาด
          setLoading(false);
        });

    }



  };







  useEffect(() => {
    const storedBasket = localStorage.getItem("menuOrders");



    if (storedBasket) {
      const parsedBasket = JSON.parse(storedBasket);
      console.log("Parsed Basket:", parsedBasket);

      const newMergedItems = [];
      parsedBasket.forEach((item, index) => {
        console.log("Item:", item);

        if (
          item.menuOrders &&
          item.menuOrders[0]
        ) {
          const newOptionsMenu = item.menuOrders[0].optionsMenu.map((option, idx) => ({

            optionName: option.optionName || `Option ${idx + 1}`,
            optionDetail: [
              {
                optionDetails: option.optionDetail?.[0]?.optionDetails || null,
              },
            ],
          }));

          const newItem = {
            status: item.menuOrders[0].status,
            nameMenu: item.menuOrders[0].nameMenu,
            detailMenu: null, // Assuming this is null
            img: item.menuOrders[0].img,
            total: item.menuOrders[0].total,
            price: item.menuOrders[0].price,
            typemenu: item.menuOrders[0].typemenu,
            optionsMenu: newOptionsMenu,
          };

          const existingItem = newMergedItems.find(
            (mergedItem) =>
              JSON.stringify(mergedItem.optionsMenu) === JSON.stringify(newOptionsMenu)
          );

          if (existingItem) {
            existingItem.total += item.menuOrders[0].total;
          } else {
            newMergedItems.push(newItem);
          }
        } else {
          console.warn("Malformed item in basket:", item);
        }
      });

      setMergedItems(newMergedItems);

      localStorage.setItem(
        "menuOrders",
        JSON.stringify(
          newMergedItems.map((item) => ({
            menuOrders: [
              {
                status: item.status,
                nameMenu: item.nameMenu,
                detailMenu: item.detailMenu,
                img: item.img,
                total: item.total,
                typemenu: item.typemenu,
                optionsMenu: item.optionsMenu,
                price: item.price,
              },
            ],
          }))
        )
      );
    }
  }, []);

  /////////////////////ฟังก์ชันจัดการข้อมูล///////////////////////
  const updateLocalStorageFromMergedItems = (newMergedItems) => {
    const storedBasket = JSON.parse(localStorage.getItem("menuOrders")) || [];

    storedBasket.forEach((item, i) => {
      const optionsMenu = item.menuOrders[0].optionsMenu.map(
        (option) => option.optionDetail?.[0]?.optionDetails
      );

      const matchingMergedItem = newMergedItems.find(
        (mergedItem) =>
          JSON.stringify(mergedItem.optionsMenu) === JSON.stringify(optionsMenu)
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
    const updatedItems = mergedItems.filter((_, i) => i !== index);
    setMergedItems(updatedItems);

    const storedBasket = JSON.parse(localStorage.getItem("menuOrders")) || [];
    const updatedBasket = storedBasket.filter((_, i) => i !== index);
    localStorage.setItem("menuOrders", JSON.stringify(updatedBasket));

    updateLocalStorageFromMergedItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return mergedItems.reduce((acc, item) => acc + item.total * item.price, 0);
  };

  return (
    <div className="basket">
      <>
        {/* ส่วนอื่นๆ ของ JSX */}
        <button onClick={PostOrder}></button>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
      <div className="flex justify-center ">
        <div className="fixed bottom-0 box-monney w-full xl:w-1/2 bg-white">
          <div className="flex justify-between mb-3 ">
            <div>รวม</div>
            <div className="orange-text">฿ {calculateTotalPrice().toFixed(2)}</div>
          </div>
          <div
            onClick={() => PostOrder()}
            className="btn-add-basket flex justify-center items-center"
          >
            <FoodBankIcon />
            <div className="ms-3">สั่งอาหาร</div>
          </div>
        </div>
      </div>
      <div className="shadow-xl rounded-b-2xl">
        <div className="container-sm">
          <div className="flex pt-14 pb-10 w-full items-center">
            <div>
              <a> <ArrowBackIcon className="orange-text" onClick={() => { window.location.href = `/home/${storedtableId}` }} /></a>
            </div>
            <div className="flex-1 text-center me-6 font-bold">ตะกร้า</div>
          </div>
        </div>
      </div>

      <div className="container-edit ">
        <div className="container-sm mt-6">
          <div>
            {mergedItems.map((item, index) => (
              <div className="flex card-menu bg-white mb-3" key={index}>
                <img src={Menu} alt="" className="object-cover" />
                <div className="flex flex-col justify-between w-full p-2">
                  <div className="flex justify-between">
                    <div className="font-bold">{item.nameMenu}</div>
                    <div>
                      <button
                        className="bg-red-500 text-white p-1 rounded-md"
                        onClick={() => removeItem(index)}
                      >
                        <DeleteIcon sx={{ fontSize: 24 }} />
                      </button>
                    </div>
                  </div>
                  <ul className="text-sm list-disc ps-4">
                    {item.optionsMenu.map((detail, i) => (
                      <li key={i}>
                        {detail.optionDetail && detail.optionDetail[0]
                          ? detail.optionDetail[0].optionDetails || "N/A"
                          : "N/A"}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between text-sm">
                    <div className="flex gap-2 items-center orange-text">
                      <div>{item.price}</div>
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
    </div>
  );
};

export default Basket;
