import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Promptpay from "../assets/payment/promptpay.png";
import PaymentsIcon from "@mui/icons-material/Payments";

import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Payment = () => {
  return (
    <div className="Payment container-edit">
      <div className="container-sm ">
        <div className="flex pt-14 pb-10 w-full items-center">
          <div>
            <ArrowBackIcon className="orange-text" />
          </div>
          <div className="flex-1 text-center me-6 font-bold">สถานะอาหาร</div>
        </div>
      </div>

      <div className="container-sm">
        <div>
          <div>วิธีชำระเงิน</div>
          <div className="flex justify-between items-center  mt-5">
            <div className="w-20">
              {" "}
              <img className="w-full" src={Promptpay} alt="" />
            </div>
            <div className=" w-20 "><div className="">promptpay</div></div>
            <div className="flex justify-end w-20">
              {" "}
              <Checkbox {...label} style={{ color: "#FF724C" }}  />
            </div>
          </div>
          <div className="justify-between items-center flex mt-5">
            <div className="flex justify-center w-20">
              <PaymentsIcon className=" text-green-600" />
            </div>
            <div className="w-20">เงินสด</div>
            <div className="flex justify-end w-20">
              {" "}
              <Checkbox {...label} style={{ color: "#FF724C" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mt-10">
              <div>รวม</div>
              <div className="orange-text">1000</div>
            </div>
            <div className="flex justify-center orange-back rounded-md text-white py-2 mt-3">
              {" "}
              <button>ชำระเงิน</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
