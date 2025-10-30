import React from 'react'
import "./index.css"
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/autoplay'; 

const App = () => {
  return (
    <>
    <ToastContainer position='top right'/>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>

  )
}

export default App