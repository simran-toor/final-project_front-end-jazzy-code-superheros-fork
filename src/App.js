import "./App.css";

import { Nav } from "./Components/Nav";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//this import no longer required unless we add
//more functionality - remove once dev complete
import { useState, useEffect } from "react";

//custom hooks
import { useFetch } from "./hooks/useFetch";

//components
import Home from "./Components/Home";
import GetHelp from "./Components/GetHelp";
import GiveHelp from "./Components/GiveHelp";
import Footer from "./Components/Footer/footer";
import LandingPage from "./Components/LandingPage";
import ContactPage from "./Components/ContactPage";
import Cms from "./Components/Cms";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  let [inputFoodBank, setInputFoodBank] = useState();
  let [submitedBank, setSubmitedBank] = useState();
  let [foodBankData, setFoodBankData] = useState();


  console.log(`App rerenders`);

  function handleChange(e) {
    setInputFoodBank(e.target.value);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputBox = document.getElementById("inputbox");

      setSubmitedBank(inputFoodBank);
      // 👇️ clear input field
      inputBox.value = "";

      console.log(inputFoodBank);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    const inputBox = document.getElementById("inputbox");

    // Send value to server
    console.log(inputBox.value);

    setSubmitedBank(inputFoodBank);
    // 👇️ clear input field
    inputBox.value = "";
  }

  const foodbankName = submitedBank;

  const rootUrl = `https://www.givefood.org.uk/api/2/foodbanks/search/?address=`;

  const url = `${rootUrl}${foodbankName}`;

  //Fetch hook to request the data from the API

  const searchArray = useFetch(url, foodbankName);

  //dev feedback only remove
  console.log(`foodBankData from fetch >>>`, foodBankData);
  console.log(`inputFoodBank state >>>`, inputFoodBank);
  console.log(`submitedBank state >>>`, submitedBank);

  //dev feedback only remove
  useEffect(() => {
    return () => {
      console.log(`App is unmounting!`);
    };
  }, []);

  const { isAuthenticated } = useAuth0();

  console.log("isLoggedIn >>>", isAuthenticated);
  return (
    <div className="App">

      <div className="container">
        <Router>
          {foodBankData ? <Nav /> : null}
          <Routes>
            <Route path="/admin" element={<Cms />}></Route>
            <Route path="/">
              {foodBankData ? (
                <>
                  <Route
                    path="/search"
                    element={
                      <LandingPage
                        searchArray={searchArray}
                        setFoodBankData={setFoodBankData}
                        handleChange={handleChange}
                        handleClick={handleClick}
                        handleEnter={handleEnter}
                      />
                    }
                  ></Route>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home
                        foodBankData={foodBankData}
                        handleChange={handleChange}
                        handleClick={handleClick}
                        handleEnter={handleEnter}
                      />
                    }
                  ></Route>
                  <Route path="/gethelp" element={<GetHelp foodBankData={foodBankData} />}></Route>
                  <Route
                    path="/givehelp"
                    element={<GiveHelp foodBankData={foodBankData} />}
                  ></Route>
                  <Route
                    path="/contact"
                    element={<ContactPage foodBankData={foodBankData} />}
                  />
                </>
              ) : (
                <Route
                  path="/"
                  element={
                    <LandingPage
                      searchArray={searchArray}
                      setFoodBankData={setFoodBankData}
                      handleChange={handleChange}
                      handleClick={handleClick}
                      handleEnter={handleEnter}
                    />
                  }
                />
              )}
            </Route>
          </Routes>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
