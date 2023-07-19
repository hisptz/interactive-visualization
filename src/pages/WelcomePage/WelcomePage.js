import { useNavigate } from "react-router";
import { Steps } from "intro.js-react";
import { Button } from "@dhis2/ui";
import React, { useState } from "react";
import files from "../../files.svg";

const steps = [
  {
    selector: "#help1",
    intro:
      "The Interactive Visualization Tool enhances the DHIS2 platform by enabling users to analyze external data sources that are not found within the DHIS2 warehouse. With this tool, users can gain valuable insights and discover patterns, expanding their data analysis capabilities and empowering informed decision-making.",
  },
];

export function WelcomePage() {
  const navigate = useNavigate();
  const [openHelper, setOpenHelper] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        paddingRight: 100,
        paddingLeft: 100,
        justifyContent: "center",
        position: "relative",
        marginTop: 50,
      }}
    >
      <div
        style={{
          flex: "1",
          paddingTop: 5,
          marginRight: 50,
          alignItems: "center",
        }}
      >
        <img src={files} width={"350px"} alt="Interactive Data Visualization" />
      </div>
      <Steps
        steps={steps}
        enabled={openHelper}
        onExit={() => setOpenHelper(false)}
        initialStep={0}
      />
      <h1>Welcome to Interactive Data Visualization Tool ! </h1>
      <div
        style={{
          gap: 20,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <Button
          large
          name="Large button"
          onClick={() => navigate("/visualization")}
        >
          Get started
        </Button>
        <Button
          id="help1"
          large
          name="Large button"
          onClick={() => setOpenHelper(true)}
        >
          Help
        </Button>
      </div>
    </div>
  );
}
