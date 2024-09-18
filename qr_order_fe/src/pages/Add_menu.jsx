import React, { useState , useEffect } from "react";
import AddImage from "../assets/menage/add-image.png";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from 'sweetalert2';
import { API_ROUTES } from "../components/API_share";

export const AddMenu = () => {
  const [namemenu, setNameMenu] = useState("");
  const [detailmenu, setDetailMenu] = useState("");
  const [img, setImg] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const [price, setPrice] = useState(1);
  const [total, setTotal] = useState(1);
  const [typemenu, setTypeMenu] = useState("");
  const [optionsmenu, setOptionsMenu] = useState([]);



  const handleInputChange = (event, setValue) => {
    const value = event.target.value;
    setValue(value);
  };


  const increment = (setQuantity) => {
    setQuantity((prevValue) => (parseInt(prevValue) || 0) + 1); // บวกค่าในฟิลด์
  };

  const decrement = (setQuantity) => {
    setQuantity((prevValue) => (parseInt(prevValue) > 1 ? parseInt(prevValue) - 1 : 1)); // ลบค่าในฟิลด์
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImg(file)
    if (file) {
      setImgURL(URL.createObjectURL(file));

    }
  };

  const handleDropdownChange = (event) => {
    setTypeMenu(event.target.value);
  };

  const addSection = () => {
    setOptionsMenu((prevOptions) => [
      ...prevOptions,
      { option_name: "", optiondetail: [{ optiondetails: "" }] },
    ]);
  };

  const addOptionDetail = (index) => {
    const newOptionsMenu = [...optionsmenu];
    newOptionsMenu[index].optiondetail.push({ optiondetails: "" });
    setOptionsMenu(newOptionsMenu);
  };

  const handleSectionChange = (event, index) => {
    const value = event.target.value;
    const newOptionsMenu = [...optionsmenu];
    newOptionsMenu[index].option_name = value;
    setOptionsMenu(newOptionsMenu);
  };

  const handleOptionDetailChange = (event, sectionIndex, detailIndex) => {
    const value = event.target.value;
    const newOptionsMenu = [...optionsmenu];
    newOptionsMenu[sectionIndex].optiondetail[detailIndex].optiondetails = value;
    setOptionsMenu(newOptionsMenu);
  };

  const deleteOption = (sectionIndex, optionIndex) => {
    const newOptionsMenu = [...optionsmenu];
    newOptionsMenu[sectionIndex].optiondetail.splice(optionIndex, 1);
    setOptionsMenu(newOptionsMenu);
  };

  const deleteSection = (sectionIndex) => {
    setOptionsMenu((prevOptions) =>
      prevOptions.filter((_, index) => index !== sectionIndex)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create formData for image upload
    const imageFormData = new FormData();
    if (img) {
      imageFormData.append('files', img);
    }
  
    try {
      // Upload image and get URL
      const imageResponse = await fetch(API_ROUTES.API_r+'/admin/menus/upload', {
        method: 'POST',
        body: imageFormData,
      });
  
      const imageResponseData = await imageResponse.json();
      if (imageResponse.ok && imageResponseData.fileUrls && imageResponseData.fileUrls.length > 0) {
        const uploadedImgURL = imageResponseData.fileUrls[0];
        
        // Prepare final JSON data
        const menuData = {
          namemenu,
          detailmenu,
          img: uploadedImgURL, // Use the URL from the image upload response
          price,
          total,
          typemenu,
          optionsmenu: optionsmenu.length ? optionsmenu : [] // Ensure it's an array
        };
        console.log(menuData);
        
  
        // Send JSON data
        const response = await fetch(API_ROUTES.API_r+'/admin/menus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(menuData),
        });
  
        const responseData = await response.text();
  
        if (response.ok) {
          Swal.fire('Success', 'Menu added successfully!', 'success');
          
          // Reset form fields
          setNameMenu("");
          setDetailMenu("");
          setImg(null);
          setImgURL("");
          setPrice(1);
          setTotal(1);
          setTypeMenu("");
          setOptionsMenu([]);
        } else {
          // Handle error response
          Swal.fire('Error', responseData.message || 'Failed to add menu. Please try again.', 'error');
        }
      } else {
        Swal.fire('Error', 'Failed to upload image. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to add menu. Please try again.', 'error');
    }
  };

  return (
    <div>
      <div className="add-menage ">
        <div
          className="orange-back"
          style={{ height: "60px", width: "100%" }}
        ></div>
        <div>
          <div className="flex justify-center font-bold my-5 ">เพิ่มเมนู</div>
          <form onSubmit={handleSubmit}>
            <div className="bg-white ">
              <div className="grid xl:grid-cols-3 xl:gap-20 p-6 mx-10 rounded-md">
                <div className="flex justify-center">
                  <div className="rounded-md border-2  mb-5" style={{ height: "250px", width: "250px" }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      id="imageInput"
                    />
                    <img
                      src={imgURL || AddImage} // แสดงภาพที่อัปโหลด หรือภาพเริ่มต้นหากยังไม่มีการอัปโหลด
                      alt="add-image-food"
                      style={{ width: "100%", height: "100%", cursor: "pointer", objectFit: "cover" }}
                      onClick={() => document.getElementById('imageInput').click()}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full mb-6"
                    aria-label="add-name-food"
                    placeholder="ชื่ออาหาร"
                    value={namemenu}
                    onChange={(e) => handleInputChange(e, setNameMenu)}
                  />
                  <input
                    type="text"
                    className="w-full mb-6"
                    aria-label="add-detail-food"
                    placeholder="รายละเอียดอาหาร"
                    value={detailmenu}
                    onChange={(e) => handleInputChange(e, setDetailMenu)}
                  />

                  <div className="mb-2">ราคาอาหาร</div>
                  <div className="flex items-center mb-6">
                    <div
                      onClick={() => decrement(setPrice)}
                      className="rounded-md flex justify-center items-center"
                      style={{
                        border: "1px solid #C5C5C5",
                        width: "60px",
                        height: "40px",
                      }}
                    >
                      -
                    </div>

                    <input
                      type="number"
                      className="w-full mx-6"
                      aria-label="add-price-food"
                      placeholder="ราคา"
                      onChange={(e) => handleInputChange(e, setPrice)}
                      value={price === "" ? "" : price}
                    />
                    <div
                      onClick={() => increment(setPrice)}
                      className="rounded-md flex justify-center items-center orange-text"
                      style={{
                        border: "1px solid #FF724C",
                        width: "60px",
                        height: "40px",
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div className="mb-2">จำนวนอาหาร</div>
                  <div className="flex items-center mb-6">
                    <div
                      onClick={() => decrement(setTotal)}
                      className="rounded-md flex justify-center items-center"
                      style={{
                        border: "1px solid #C5C5C5",
                        width: "60px",
                        height: "40px",
                      }}
                    >
                      -
                    </div>
                    <input
                      type="number"
                      className="w-full mx-6"
                      aria-label="add-total-food"
                      placeholder="จำนวน"
                      onChange={(e) => handleInputChange(e, setTotal)}
                      value={total === "" ? "" : total}
                    />

                    <div
                      onClick={() => increment(setTotal)}
                      className="rounded-md orange-text flex justify-center items-center"
                      style={{
                        border: "1px solid #FF724C",
                        width: "60px",
                        height: "40px",
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div className="mb-6">
                    <select
                      className="w-full p-2 border rounded-md"
                      value={typemenu}
                      onChange={handleDropdownChange}
                    >
                      <option value="" disabled>
                        หมวดหมู่อาหาร
                      </option>
                      <option value="น้ำ">น้ำ</option>
                      <option value="ของหวาน">ของหวาน</option>
                      <option value="จานหลัก">จานหลัก</option>
                    </select>
                  </div>
                </div>
                <div>
                  {optionsmenu.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <div className="flex items-center mb-6">
                        <input
                          type="text"
                          className="w-full"
                          aria-label="add-option-name"
                          placeholder="ชื่อตัวเลือก"
                          value={section.option_name}
                          onChange={(e) => handleSectionChange(e, sectionIndex)}
                        />
                        <div
                          onClick={() => deleteSection(sectionIndex)}
                          className="flex justify-center items-center bg-red-500 p-2 rounded-md h-full text-white ms-3"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                      {section.optiondetail.map((detail, detailIndex) => (
                        <div className="mx-6" key={detailIndex}>
                          <div className="flex mb-6 items-center">
                            <input
                              type="text"
                              className="w-full"
                              aria-label="add-option-detail"
                              placeholder="รายละเอียดตัวเลือก"
                              value={detail.optiondetails}
                              onChange={(e) =>
                                handleOptionDetailChange(e, sectionIndex, detailIndex)
                              }
                            />
                            <div
                              onClick={() => deleteOption(sectionIndex, detailIndex)}
                              className="flex justify-center items-center bg-red-500 p-2 rounded-md h-full text-white ms-3"
                            >
                              <DeleteIcon />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={() => addOptionDetail(sectionIndex)}
                        className="rounded-md orange-text ps-3 w-full py-3 mb-6 bg-green-500 text-white"
                      >
                        + เพิ่มรายละเอียดตัวเลือก
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={addSection}
                    className="rounded-md orange-text ps-3 w-full py-3 mb-6 orange-back text-white"
                  >
                    + เพิ่มหัวข้อตัวเลือก
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-20">
                <input
                  type="submit"
                  value="บันทึก"
                  className="rounded-md orange-text px-16 xl:w-1/3 w-1/2 py-3 mb-6 orange-back text-white"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
