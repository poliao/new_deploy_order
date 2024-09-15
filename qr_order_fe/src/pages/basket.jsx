import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "../assets/menu-detail/menu.png";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_ROUTES } from "../components/API_share";

const Basket = () => {
  const [mergedItems, setMergedItems] = useState([]);

  const storedtableId = localStorage.getItem("tableId");


  const PostOrder = () => {
    mergedItems.forEach((item) => {
      const orderData = {
        status: item.status,
        nameMenu: item.nameMenu,
        detailMenu: item.detailMenu,
        img: item.img,
        price: item.price,
        total: item.total,
        optionsMenu: item.optionsMenu.map((option) => ({
          optionName: option.optionName,
          optionDetail: option.optionDetail.map((detail) => ({
            optionDetails: detail.optionDetails,
          })),
        })),
        table: {
          tableId: "f5ce1cf0-ac23-45bd-a8d1-93fdc3e55f77", // Assuming you're sending the tableId as part of the object
        },
      };
  
      console.log(orderData);
  
      axios
        .post(`${API_ROUTES.API_r}/api/baskets`, orderData)
        .then((response) => {
          console.log("Order sent for item:", item.nameMenu);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error sending order for item:", item.nameMenu);
          console.error(error);
        });
    });
  };

useEffect(() => {
  const storedBasket = localStorage.getItem("menuOrders");
  if (storedBasket) {
    const parsedBasket = JSON.parse(storedBasket);
    console.log("Parsed Basket:", parsedBasket);

    const newMergedItems = [];
    parsedBasket.forEach((item, index) => {
      if (
        item.menuOrders &&
        item.menuOrders[0] &&
        item.menuOrders[0].optionsMenu &&
        item.menuOrders[0].optionsMenu.length > 0
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
    <div className="flex justify-center ">
      <div className="fixed bottom-0 box-monney w-full xl:w-1/2">
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
           <a> <ArrowBackIcon className="orange-text" onClick={() => {  window.location.href = `/home/${storedtableId}` }}  /></a>
          </div>
          <div className="flex-1 text-center me-6 font-bold">ตะกร้า</div>
        </div>
      </div>
    </div>

    <div className="container-sm container-edit mt-6">
      <div>
        {mergedItems.map((item, index) => (
          <div className="flex card-menu mb-3" key={index}>
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
);
};

export default Basket;
