import React, { useEffect, useState } from "react";
import Menu from "../assets/menu-detail/menu.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StarIcon from "@mui/icons-material/Star";
import { API_ROUTES } from "../components/API_share";
import Count from "../components/count";
import axios from "axios";
import { useParams } from "react-router-dom";

const MenuDetail = () => {
  const [count, setCount] = useState(1); 


  
  const { menuid } = useParams();
  const [menudata, setmenudata] = useState({
    namemenu: "",
    price: "",
    detailmenu: "",
    img: "",
    optionsmenu: [],
  });

  const [selectedOptions, setSelectedOptions] = useState({});

  
  

  useEffect(() => {
    axios.get(API_ROUTES.API_r+"/admin/menus/" + menuid).then((res) => {
      setmenudata({
        ...menudata,
        namemenu: res.data.namemenu,
        price: res.data.price,
        detailmenu: res.data.detailmenu,
        img: res.data.img,
        optionsmenu: res.data.optionsmenu, // Assume this returns the correct optionsmenu structure
      });
    });
  }, [menuid]);

  const handleOptionChange = (optionIndex, detailValue) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionIndex]: detailValue,
    }));
  };
 

  const handleAddToBasket = () => {
    
    // Assuming that menudata already holds the correct values for nameMenu, img, and price
    const menuOrder = {
      
      table: {
        tableId: 1, // You can make this dynamic based on the selected table
      },
      menuOrders: [
        {
          status: "กำลังทำ", // Assuming this status is fixed
          nameMenu: menudata.namemenu, // Name of the menu item
          img: menudata.img, // Placeholder image (change if needed)
          total: count, // Assuming you have a counter component like Count, you can grab its value
          price: menudata.price,
          optionsMenu: menudata.optionsmenu.map((option, index) => ({
            optionName: option.option_name,
            optionDetail: [
              {
                optionDetails: selectedOptions[index] || "", // Use the selected option or fallback
              },
            ],
          })),
        },
      ],
    };

//     const handleAddToBasket = () => {
//   // Construct the menuOrder object based on the selected data and options
//   const menuOrder = {
//     table: {
//       tableId: 1, // This can be made dynamic if needed
//     },
//     menuOrders: [
//       {
//         status: "กำลังทำ", // Fixed status
//         nameMenu: menudata.namemenu, // Name of the menu item
//         img: menudata.img, // Image of the menu item
//         total: count, // Number of items ordered
//         optionsMenu: menudata.optionsmenu.map((option, index) => ({
//           optionName: option.option_name,
//           optionDetail: [
//             {
//               optionDetails: selectedOptions[index] || "", // Selected option or fallback
//             },
//           ],
//         })),
//       },
//     ],
//   };

//   // Retrieve the existing orders from localStorage (or create an empty array if none exists)
//   const existingOrders = JSON.parse(localStorage.getItem("menuOrders")) || [];

//   // Add the new menuOrder to the existing orders
//   const updatedOrders = [...existingOrders, menuOrder];

//   // Save the updated orders array back to localStorage
//   localStorage.setItem("menuOrders", JSON.stringify(updatedOrders));

//   // Optionally, you can log the updated orders to the console for debugging
//   console.log("Updated Orders:", updatedOrders);
// };

const existingOrders = JSON.parse(localStorage.getItem("menuOrders")) || [];

// Add the new menuOrder to the existing orders
const updatedOrders = [...existingOrders, menuOrder];

// Save the updated orders array back to localStorage
localStorage.setItem("menuOrders", JSON.stringify(updatedOrders));

// Optionally, you can log the updated orders to the console for debugging
console.log("Updated Orders:", updatedOrders);

    

    // axios
    // .post("http://localhost:8080/api/baskets", menuOrder)
    // .then((response) => {
    //   console.log("Order added to basket:", response.data);
    // })
    // .catch((error) => {
    //   console.error("There was an error adding the order to the basket:", error);
    // });

  

  };
  return (
    <div className="menuDetail container-edit">
      <div>
        <div className="flex justify-center">
          <div
            className="btn-add-basket flex justify-center items-center"
            onClick={handleAddToBasket} // Add onClick event handler here
          >
            <ShoppingBasketIcon />
            <div className="ms-3">ใส่ตะกร้า</div>
          </div>
        </div>
        <div className="relative">
          <img src={Menu} alt="" className="menu-image" />
          <div className="box-undo">
            <a href="/home/1"><ArrowBackIcon className="text-xl" /></a>
          </div>
          <div className="basket-box">
            <div className="relative">
              <a href="/basket"><ShoppingBasketIcon fontSize="large" /></a>
            
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
                      {/* Radio button for each optiondetail */}
                      <input
                        type="radio"
                        id={`option-menu-${index}-${detailIndex}`}
                        name={`option-${index}`}
                        value={detail.optiondetails}
                        onChange={() =>
                          handleOptionChange(index, detail.optiondetails)
                        }
                        checked={selectedOptions[index] === detail.optiondetails}
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
  );
};

export default MenuDetail;
