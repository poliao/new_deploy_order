import React from 'react';
import logo from "../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarService = (props) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Login";
  };
    return (
        <div>
              <div className="bg-white sm:flex justify-between items-center px-8 py-4 hidden">
       <div className="flex items-center"> 
        <div><img src={logo} alt="" className="w-10" /></div>
        <div className="ms-4 font-bold">{props.title}</div>
        </div>
        <button className="font-bold flex  items-center border-red-500 border-2 rounded-md text-red-500 px-6 py-3" onClick={ () =>  handleLogout() }>
                  <LogoutIcon />
                  <div className="ms-2 hidden sm:block">ออกจากระบบ</div>
                </button>
      </div>
        </div>
    );
}

export default NavbarService;
