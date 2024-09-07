import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarCategory from '../components/NavbarCategory';
import MainFood from '../assets/topMenu-img/main-food.svg';
import Water from '../assets/topMenu-img/water.svg';
import Dessert from '../assets/topMenu-img/dessert.svg';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MenuCard from '../components/MenuCard';
import { useParams } from 'react-router-dom';

const Category = () => {
    const { namecategory } = useParams();
    const [category, setCategory] = useState('');
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        // Set the initial category based on the route param
        if (namecategory === "MainFood")  {
            setCategory("จานหลัก");
        } else if (namecategory === "Water") {
            setCategory("น้ำ");
        } else if (namecategory === "Dessert") {
            setCategory("ของหวาน");
        } else {
            setCategory("หมวดหมู่ไม่ถูกต้อง");
        }
    }, [namecategory]);

    useEffect(() => {
        // Fetch the data from the API whenever category changes
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/menus');
                const filteredMenu = response.data.filter(item => item.typemenu === category);
                setMenu(filteredMenu);
            } catch (error) {
                console.error('Error fetching the menu:', error);
            }
        };

        if (category && category !== "หมวดหมู่ไม่ถูกต้อง") {
            fetchMenu();
        }
    }, [category]);

    // Handle SwiperSlide click to change the category
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <div>
            <NavbarCategory title={category} />

            <div className="mt-5">
                <Swiper
                    style={{ overflow: "hidden" }}
                    spaceBetween={10}
                    slidesPerView={2.7}
                >
                    <SwiperSlide onClick={() => handleCategoryChange("จานหลัก")}>
                        <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md cursor-pointer">
                            <img src={MainFood} alt="Main Food" />
                            <div className="ms-3 font-bold">จานหลัก</div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide onClick={() => handleCategoryChange("น้ำ")}>
                        <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md cursor-pointer">
                            <img src={Water} alt="Water" />
                            <div className="ms-3 font-bold">น้ำ</div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide onClick={() => handleCategoryChange("ของหวาน")}>
                        <div className="flex items-center justify-center bg-white py-3 px-2 rounded-md cursor-pointer">
                            <img src={Dessert} alt="Dessert" />
                            <div className="ms-3 font-bold">ของหวาน</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className='container-sm'>
                {menu.map((data, index) => (
                    <MenuCard key={index} name={data.namemenu} detail={data.detail} price={data.price} />
                ))}
            </div>
        </div>
    );
};

export default Category;
