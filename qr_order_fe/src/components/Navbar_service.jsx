import React from 'react';
import logo from "../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';

const NavbarService = (props) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Login";
  };

  const handleHome = () => {
    window.location.href = "/HomeService";
  };
  return (
    <div>
      <div className="bg-white lg:flex justify-between items-center px-8 py-4 hidden">
        <div className="flex items-center">
          <div><img src={logo} alt="" className="w-10" /></div>
          <div className="ms-4 font-bold">{props.title}</div>
        </div >
        <div className='flex gap-3'>
          <button className="font-bold flex  items-center  rounded-md orange-back text-white px-6 py-3" onClick={() => handleHome()}>
            <HomeIcon />
            <div className="ms-2 hidden lg:block">หน้าหลัก</div>
          </button>
          <button className="font-bold lg:flex hidden items-center border-yellow-500 border-2 rounded-md text-yellow-500 px-6 py-3" onClick={() => window.location.href = "/report "}>
            <InsightsIcon />
            <div className="ms-2 hidden sm:block">กระดานสรุปยอด</div>
          </button>
          <button className="font-bold flex  items-center border-red-500 border-2 rounded-md text-red-500 px-6 py-3" onClick={() => handleLogout()}>
            <LogoutIcon />
            <div className="ms-2 hidden lg:block">ออกจากระบบ</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarService;
