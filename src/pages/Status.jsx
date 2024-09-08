import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Menu from '../assets/menu-detail/menu.png'
import Count from '../components/count';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FoodBankIcon from '@mui/icons-material/FoodBank';
const Status = () => {
    return (
        <div className="basket"> 
             <div className='flex justify-center'>
            
                   <div className='fixed bottom-0 box-monney'>
                    <div className='flex justify-between  mb-3'>
                        <div>Vat</div>
                        <div className='orange-text'>฿ 0.00</div>
                    </div>
                        <div className='btn-add-basket flex justify-center items-center'>
                          
                            <FoodBankIcon />
                            <div className='ms-3'>ชำระเงิน</div>
                        </div>
                   </div>
                </div>
            <div className=" shadow-xl rounded-b-2xl ">
            <div className="container-sm">
              <div className="flex pt-14 pb-10 w-full items-center">
                <div><ArrowBackIcon className="orange-text" /></div>
                <div className="flex-1 text-center me-6 font-bold">สถานะอาหาร</div>
              </div>
            </div>
          </div>

          <div className="container-sm mt-6">
                <div>
                    <div className="flex card-menu mb-3">
                        <img src={Menu}  alt="" />
                        <div className=' flex flex-col justify-between w-full p-2' >
                    
                            <div className='font-bold'>ข้าวซอยทรัฟเฟิล </div>   
                             
                                    <ul className='text-sm list-disc ps-4' >
                                        <li>เนื้อ</li>
                                        <li>ปกติ</li>                                 
                                    </ul>
                                    <div className='flex justify-between text-sm'>
                                        <div className='flex gap-2 items-center orange-text'>
                                            <div>320</div>
                                            <div>บาท</div>
                                        </div>
                                        <div className='text-green-800'>
                                           รอเสิร์ฟ
                                        </div>
                                    </div>
                            
                
                        </div>
                    </div>


                  

                    
                </div>
          </div>
            
        </div>
      
      
    
    );
}

export default Status;
