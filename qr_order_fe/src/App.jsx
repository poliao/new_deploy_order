
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Add_menu from './pages/Add_menu'
import BoardMenage from './pages/board_Menage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuDetail from './pages/MenuDetail'
import Basket from './pages/basket'
import Status from './pages/Status'
import Category from './pages/Category';
import ServiceHome from './pages/Service_home';
import ServiceBoard from './pages/Service_board';
import Payment from './pages/Payment';
import Allmenu from './pages/Allmenu';
import Login from './pages/Login'

function App() {


  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/Home/:tableid" element={<Home />} />
        <Route path="/addMenu" element={<Add_menu />} />
        <Route path="/boardService" element={<BoardMenage />} />
        <Route path="/menuDetail/:menuid" element={<MenuDetail />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/status/:tableid" element={<Status />} />
        <Route path="/HomeService" element={<ServiceHome />} />
        <Route path="/boardChef" element={<ServiceBoard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/category/:namecategory" element={<Category />} />
        <Route path="/allmenu" element={<Allmenu />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
