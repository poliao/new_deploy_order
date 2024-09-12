import React from 'react';
import Menu1 from '../assets/topMenu-img/menu-1.png';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const MenuCard = (props) => {
    return (
        <div >
               <div className="mt-3 ">
        
        <div className="mb-2 bg-white shadow-md rounded-md" >
          <div onClick={props.onClick} 
            className="flex"
            style={{
              borderRadius: "12px",
            
            }}
          >
            <img src={Menu1} alt="" className="rounded-s-xl object-cover" />
            <div className="p-3 w-full flex justify-between flex-col" >
              <div>
                <div className="font-bold lg:text-lg">{props.name}</div>
                <div className="text-xs md:text-sm lg:text-sm">
                  {props.detail}
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="text-xs md:text-sm orange-text lg:text-sm">
                 {props.price}
                </div>
             <div className='text-xs font-bold  '>กดดูเมนู  </div>
              </div>
            </div>
            
          </div>
        </div>
  
    </div>
        </div>
    );
}

export default MenuCard;
