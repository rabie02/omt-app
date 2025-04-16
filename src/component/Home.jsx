import React from "react";
import Products from "./products";
import Footer from './Footer';

const Home = () => {
  return (
  
    <div className="hero">
      <div className="card text-bg-dark border-0">
        <img src="\assets\back-home-1.png" className="card-img" alt="Background"  height="550px"/>
        <div className="card-img-overlay  d-flex flex-column justify-content-center">
            <div className="containre"></div>

        </div>
      </div>
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;
