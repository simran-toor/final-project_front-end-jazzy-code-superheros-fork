import { List } from "../List";
import ToggleCardGeneral from "../GetHelp/ToggleCardGeneral";
import Button from "../Button";
import Container from "../Map/Map.js";
import "./style.css";
import D from "../StyledDiv";

const GiveHelp = ({ foodBankData }) => {
  return (
    <div className="give-help">
      <h1>Give Help</h1>

      <div className="imageDiv">
        <img
          className="bannerImage"
          src="https://i.imgur.com/VWCzSCo.jpeg"
          alt="container cover, people giving help"
        ></img>
      </div>

      <ToggleCardGeneral
        cardTitle="Donate Money"
        cardBody="Foodbanks are mostly volunteer run organisations, 
        and rely on contributions from the local community. 
        While many people think of giving food first and foremost, 
        there is also an urgent need for cash donations; 
        this helps with funding further services and community groups to help those in need.
        "
      >
        <a href={foodBankData.urls.homepage} target="_blank" rel="noreferrer">
          <Button nameButton="Donate" />
        </a>
      </ToggleCardGeneral>

      <ToggleCardGeneral cardTitle="Donate Items">
        <D>
          <p>
            Your local foodbank will be grateful for whatever you can share.
            however, there are usually items that are more in need.
          </p>
          <p style={{ "font-weight": "bold" }}>
            If {foodBankData.name} foodbank has any special requests we have
            listed them below:
          </p>
        </D>
        <List foodBankData={foodBankData} />
      </ToggleCardGeneral>

      <ToggleCardGeneral
        cardTitle="Donate Your Time"
        cardBody="Placeholder for form"
      />
      <Container foodBankData={foodBankData} />
    </div>
  );
};

export default GiveHelp;
