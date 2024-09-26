import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Table from "../assets/navbar-img/table.svg";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import Bar from '../assets/board/bar.svg';
import logo from '../assets/logo.png'
import axios from 'axios';


// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//     'Page A',
//     'Page B',
//     'Page C',
//     'Page D',
//     'Page E',
//     'Page F',
//     'Page G',
// ];



export default function Chart() {

    const [chartWidth, setChartWidth] = React.useState(window.innerWidth * 0.8);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [xLabels, setXLabels] = useState([]); // สำหรับ labels ของแต่ละเดือน
    const [totalSales, setTotalSales] = useState([]); // สำหรับยอดขายแต่ละเดือน

    const handleSidebar = () => {
      setSidebarVisible(!isSidebarVisible); // Toggle the boolean state
    };

    useEffect(() => {
        // ดึงข้อมูลจาก API เมื่อ component โหลด
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/history/sales/2024');
                const data = response.data;

                // ประมวลผลข้อมูลสำหรับแสดงในกราฟ
                const labels = data.map(item => `Month ${item.month}`);
                const sales = data.map(item => item.total_sales);

                setXLabels(labels);
                setTotalSales(sales);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);
  

    React.useEffect(() => {
      const handleResize = () => setChartWidth(window.innerWidth * 0.8);
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/Login";
    };


    return (
        <div className='report'>
                {isSidebarVisible && (
        <div id="sidebar">
          {/* Sidebar content */}
          <div className="h-full w-3/4 sm:w-2/3  z-10 bg-white sm:p-10 p-5 pt-10 fixed">
         <div className="flex justify-end"> <img src={Bar}  alt="" className="w-8" onClick={ () => handleSidebar()} /></div>
          <div className="mt-20 font-bold ">
              <ul className="text-sm sm:text-base">
              <li className="gap-3 flex mb-5 " onClick={ () =>  window.location.href = "/homeservice"}>
                <HomeIcon />
                  <div>หน้าหลัก</div>
                </li>
                <li className="gap-3 flex mb-5   " onClick={ () =>  window.location.href = "/boardService"}>
                <EditIcon />
                  <div>จัดการเมนู</div>
                </li>
                <li className="gap-3 flex mb-5 border-b-2 pb-3  orange-back p-3 text-white rounded-md shadow-md" onClick={ () =>  window.location.href = "/report"}>
                <InsightsIcon />
                  <div>กระดานสรุปยอด</div>
                </li>
                <li className="gap-3 flex "  onClick={ () =>  handleLogout() } >
                <LogoutIcon />
                 <div> ออกจากระบบ</div>
                </li>
              </ul>
          </div>
          </div>
        </div>
      )}
            <div >
            <div className="rounded-b-2xl shadow-xl bg-white mb-4">
        <div className="container-sm xl:px-10">
          <div className="pt-14 pb-10">
            <div className="flex justify-between">
              <div className="lg:hidden flex items-center">
              <img src={Bar}  alt="" className="w-8" onClick={ () => handleSidebar()} />
              </div>
              <div className="hidden lg:flex items-center gap-3 ">
                <img src={logo} alt="" className="w-10" />
                <div className="font-bold flex items-end whitespace-nowrap">
                  ระบบจัดการโต๊ะ
                </div>
              </div>
            <div className="flex">
                <button className="lg:flex hidden font-bold items-center orange-back border-2 rounded-md text-white px-6 py-3" onClick={ () =>  window.location.href = "/boardService"}>
                  <EditIcon />
                  <div className="ms-2 hidden sm:block">จัดการเมนู</div>
                </button> 
                <button className="font-bold lg:flex hidden ms-3 items-center border-yellow-500 border-2 rounded-md text-yellow-500 px-6 py-3"onClick={ () =>  window.location.href = "/report "}>
                <InsightsIcon />
                  <div className="ms-2 hidden sm:block">กระดานสรุปยอด</div>
                </button>
                <button className="font-bold lg:flex hidden ms-3 items-center border-red-500 border-2 rounded-md text-red-500 px-6 py-3" onClick={ () =>  handleLogout() }>
                  <LogoutIcon />
                  <div className="ms-2 hidden sm:block">ออกจากระบบ</div>
                </button>
            </div>

            </div>
          </div>
        </div>
      </div>
                <div className='container-sm'>
                    <div className='card-report lg:flex lg:gap-3   mt-3'>
                        <div className='bg-white flex justify-between mb-3 rounded-md p-5 px-8 lg:w-full'>
                            <div >
                                <div className='text-gray-500'>จำนวน</div>
                                <div className='text-3xl font-bold mt-3'>1</div>
                            </div>
                            <div className='bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white '>
                                1
                            </div>
                        </div>
                        <div className='bg-white flex justify-between mb-3 rounded-md p-5 px-8 lg:w-full'>
                            <div >
                                <div className='text-gray-500'>จำนวน</div>
                                <div className='text-3xl font-bold mt-3'>1</div>
                            </div>
                            <div className='bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white '>
                                1
                            </div>
                        </div>
                        <div className='bg-white flex justify-between mb-3 rounded-md p-5 px-8 lg:w-full'>
                            <div >
                                <div className='text-gray-500'>จำนวน</div>
                                <div className='text-3xl font-bold mt-3'>1</div>
                            </div>
                            <div className='bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white '>
                                1
                            </div>
                        </div>
                        <div className='bg-white flex justify-between mb-3 rounded-md p-5 px-8 lg:w-full'>
                            <div >
                                <div className='text-gray-500'>จำนวน</div>
                                <div className='text-3xl font-bold mt-3'>1</div>
                            </div>
                            <div className='bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white '>
                                1
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='bg-white mt-3 flex justify-center '>
                            <div >
                            <LineChart
                                    width={chartWidth}
                                    height={300}
                                    series={[
                                        { data: totalSales, label: 'Total Sales' }
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                                />


                            </div>
                        </div>
                        <div>


                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white border-black mt-3">
                                    <thead class="text-xs text-white uppercase  bg-blue-500 ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Product name
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b-4 ">
                                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-black ">
                                                Magic Mouse 2
                                            </th>
                                        </tr>
                                        <tr class="bg-white border-b-4 ">
                                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-black ">
                                                Magic Mouse 2
                                            </th>
                                        </tr>
                                        <tr class="bg-white border-b-4 ">
                                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-black ">
                                                Magic Mouse 2
                                            </th>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
