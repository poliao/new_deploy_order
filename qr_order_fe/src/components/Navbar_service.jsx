import React from 'react';
import logo from "../assets/logo.png";

const NavbarService = (props) => {
    return (
        <div>
              <div className="bg-white sm:flex justify-between items-center px-8 py-4 hidden">
       <div className="flex items-center"> 
        <div><img src={logo} alt="" className="w-10" /></div>
        <div className="ms-4 font-bold">{props.title}</div>
        </div>
        <div>Login Success</div>
      </div>
        </div>
    );
}

export default NavbarService;
