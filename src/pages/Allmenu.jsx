import Reac, { useState, useEffect } from 'react';
import NavbarCategory from '../components/NavbarCategory';
import MenuCard from '../components/MenuCard';

import axios from "axios";


const Allmenu = () => {

    const [menu, setMenu] = useState(null);

    useEffect(() => {
      axios
        .get("http://localhost:8080/admin/menus")
        .then((res) => {
          setMenu(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
  
    return (
        <div>
            <NavbarCategory title="อาหารทั้งหมด" />  

         <div className='container-sm'>
                {menu && menu.length > 0 && menu.map((item, index) => (
                <MenuCard
                  key={index}
                  name={item.namemenu}
                  detail={item.detailmenu}
                  price={`${item.price} บาท`}
                />
              ))}
         </div>

        </div>
    );
}

export default Allmenu;
