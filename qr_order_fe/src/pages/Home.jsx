import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import TopMenu from '../components/TopMenu'
import { useParams } from 'react-router-dom';

export const Home = () => {

  const { tableid } = useParams();

  useEffect(() => {
    if (tableid) {
      console.log('ID from URL:', tableid);
      localStorage.setItem('tableId', tableid);

    }
  }, [tableid]); // Add id as a dependency

  

    return (
      <div className='mt-36'>
        <Navbar title="โต๊ะ 2"  />
        <TopMenu />
      </div>
    )
  }


export default Home