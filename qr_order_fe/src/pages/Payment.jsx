import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Promptpay from "../assets/payment/promptpay.png";
import PaymentsIcon from "@mui/icons-material/Payments";
import { API_ROUTES } from "../components/API_share";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Menu from "../assets/menu-detail/menu.png";
import Swal from 'sweetalert2';
import { QRCodeCanvas } from 'qrcode.react';  // Import QRCodeCanvas for QR code generation

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Payment = () => {
  const storedtableId = localStorage.getItem("tableId");
  const [totalPrice, setTotalPrice] = useState(0);
  const [menu, setMenu] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrValue, setQrValue] = useState("https://www.youtube.com/watch?v=lFpUBMKN4jM"); // New state for QR code value
  const [open, setOpen] = useState(false);  // State to manage Dialog visibility

  useEffect(() => {
    axios
      .get(API_ROUTES.API_r + "/api/baskets/table/" + storedtableId)
      .then((res) => {
        setMenu(res.data);
        const total = res.data.reduce((acc, item) => acc + item.price * item.total, 0);
        setTotalPrice(total);
      });
  }, [storedtableId]);

  // Handle change in payment method
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Handle payment button click
  const handlePayment = () => {
    if (paymentMethod === "cash") {
      Swal.fire('Warning', 'ชำระเงินที่เคาน์เตอร์', 'warning');
    } else if (paymentMethod === "promptpay") {
      setOpen(true);  // Open the Dialog for QR code payment
    } else {
      Swal.fire('Error', 'กรุณาเลือกวิธีการชำระเงิน', 'error');
    }
  };

  const handleClose = () => {
    setOpen(false);  // Close the Dialog
  };

  return (
    <div className="Payment container-edit">
      {/* Dialog for displaying QR code */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialogActions-root button': {
            color: 'red',
            fontWeight: 'bold',
            fontSize: '16px',
            border: '1px solid red',
            padding: '10px 20px',
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Qr Code"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <QRCodeCanvas value={qrValue} size={256} /> {/* Generate QR code */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ปิดหน้าต่าง</Button>
        </DialogActions>
      </Dialog>

      <div className="container-sm">
        <div className="flex pt-14 pb-10 w-full items-center">
          <div>
            <ArrowBackIcon className="orange-text" onClick={() => { window.location.href = `/status/${storedtableId}` }} />
          </div>
          <div className="flex-1 text-center me-6 font-bold">การจ่ายเงิน</div>
        </div>
      </div>

      <div className="container-sm">
        <div>
          <div className="mb-3">
            <Swiper
              style={{ overflow: "hidden" }}
              spaceBetween={10}
              slidesPerView={1.7}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {menu.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white py-3 px-2 rounded-md">
                    <div className="flex justify-between">
                      <div className="font-bold text-nowrap">{item.nameMenu}</div>
                      <div>{item.total} รายการ</div>
                    </div>
                    <img src={item.image || Menu} className="rounded-md mt-3" alt={item.name} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>วิธีชำระเงิน</div>
          <RadioGroup
            aria-label="payment-method"
            name="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <div className="flex justify-between items-center mt-5">
              <div className="w-20">
                <img className="w-full" src={Promptpay} alt="PromptPay" />
              </div>
              <div className="w-20">PromptPay</div>
              <div className="flex justify-end w-20">
                <FormControlLabel
                  value="promptpay"
                  control={<Radio style={{ color: "#FF724C" }} />}
                  label=""
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="flex justify-center w-20">
                <PaymentsIcon className="text-green-600" />
              </div>
              <div className="w-20">เงินสด</div>
              <div className="flex justify-end w-20">
                <FormControlLabel
                  value="cash"
                  control={<Radio style={{ color: "#FF724C" }} />}
                  label=""
                />
              </div>
            </div>
          </RadioGroup>

          <div>
            <div className="flex justify-between mt-10">
              <div>รวม</div>
              <div className="orange-text">{totalPrice} บาท</div>
            </div>
            <div onClick={handlePayment} className="flex justify-center orange-back rounded-md text-white py-2 mt-3">
              <button>ชำระเงิน</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
