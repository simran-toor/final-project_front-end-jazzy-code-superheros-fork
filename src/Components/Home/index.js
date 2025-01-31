//this import no longer required unless we add
//more functionality - remove once dev complete
// import {useState, useEffect} from 'react'

import AboutUs from "../About";
import Button from "../Button";
import Carousel from "../Carousel/Carousel";
import { CarouselData } from "../Carousel/CarouselData";
import Facts from "../Facts/facts";

import "./style.css";
import InputFoodBank from "../Input/Input";
import { useNavigate } from "react-router-dom";





const Home = ({ foodBankData, handleChange, handleClick, handleEnter }) => {
  
  const navigate = useNavigate();
  
  return (
    <div className="Home">
      <InputFoodBank handleChange={handleChange} handleClick={handleClick} handleEnter={handleEnter}/>
      <h1> {foodBankData ? foodBankData.name : null} </h1>
      {/* <h2>Your Support is Really Powerful.</h2> */}
      <div className="ButtonContainer">
            <Button nameButton="Get Help" onClick={() => {
              navigate('/gethelp')
            }} />
            <Button nameButton="Give Help" onClick={() => {
              navigate('/givehelp')
            }} />
      </div>
      <AboutUs foodBankData={foodBankData} />
      <Carousel slides={CarouselData} />
      <Facts />
    </div>
  );
};

export default Home;
