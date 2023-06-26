import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { Button,ButtonStrip,DropdownButton,Field,FlyoutMenu,Input,MenuItem,CircularLoader,Modal,ModalActions,ModalContent,ModalTitle,SingleSelectField,SingleSelectOption}from "@dhis2/ui";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import  SaveModal  from "./SaveModal/SaveModal";
const PlotlyRenderers = createPlotlyRenderers(Plot);

const steps = [
  {
    selector: "#help3",
    intro:
      "To begin analyzing the uploaded data, you can initiate the process by dragging and dropping the data variables presented in the top row into the empty row and column spaces located between them. This action enables you to arrange and organize the data variables in a way that facilitates analysis. ",
  },
  {
    element: "#help4",
    intro:
      "To choose a specific type of visualization, you can click on the dropdown menu option. This allows you to select the desired visualization method from the available options. By clicking on the dropdown menu, you can easily explore and switch between different visualization types to suit your analysis needs.",
  },
  {
    element: "#help5",
    intro:
      "To perform visualization using specific measures, you can select a measure from the dropdown menu located below the visualization technique. This allows you to choose the desired measure that you want to visualize in conjunction with the selected visualization technique.",
  },
  {
    element: "#save",
    intro:
      'To save a data file to the system, simply click on the "Save" button. Then, provide the desired file name and specify its status. Once you have entered this information, proceed with the save action. By following these steps, you can easily store your data file in the system, ensuring it is properly labeled and categorized for future reference and analysis.',
  },
  {
    element: "#dashboard",
    intro:
      'To add the visualization to the system dashboard, click on the "Dashboard" button. This action will allow you to push the visualization and display it on the designated dashboard within the DHIS2 system.',
  },
  {
    element: "#save2",
    intro:
      "To modify the visualization, hover your mouse over the visualization. At the top-right side, you will find options to select various modifications, including zoom, pan, autoscale, and reset axes. By choosing the desired modification, you can adjust and customize the visualization according to your preferences and analysis requirements.",
  },
  {
    element: "#setting",
    intro: "FOR SETTINGS",
  },
];
const query = {
  dE: {
      resource: "dataStore/visualization",
     id:({id})=>id

  }
}


export function Visualization() {
  const params = useParams();
  const navigate = useNavigate();
  const id = useMemo(()=> params.id, [params]);
  const {data,loading,error}=useDataQuery(query,{variables:{id}, onError: ()=>{}})

  const [state, setState] = useState();
  const [pdfData, setPdfdata] = useState([]);
  const[pngData, setPngData] = useState([]);
  const [openHelper, setOpenHelper] = useState(false);
  const visualizationData =  useMemo(()=> data?.dE?.config ?? {data: JSON.parse(localStorage.getItem(id))}, [data]);

  useEffect(()=>{
     if(visualizationData){
        setState({
          ...visualizationData
        })
     }
  }, [visualizationData])
 
 

  const pivotTableRef = useRef(null);

const handleExportPNG = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d');
  const table = new PDFTable(pngData);
  table.draw(ctx);
  const png = png.encode(canvas);
  setPngData(png.data);
}  

const handleExportPDF = () =>{
  const pdf = new jsPDF();
  pdf.addImage(new PDFTable(pdfData));
  pdf.save('pivottable.pdf');
};

  // const [onClose, setOnClose] = useState('false');
  const [onHide, setOnHide] = useState(false);
  const HandleModal = () => {
    setOnHide(true);
  };
  

  return (
    <>
      <div
        id="main"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#F5F5F5",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <div>
        <div
          id="1"
          style={{
            paddingLeft: 10,
            paddingTop: 10,
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            name="Basic button"
            value="default"
          >
            Back
          </Button>
          <div
            id="2"
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
            }}
          >
            <h1
              style={{
                paddingLeft: 100,
                marginTop: 1,
                justifyContent: "center",
                display: "flex",
              }}
            >
              {id}
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                paddingBottom: 5,
                //width:'100%',
                margin: "10px 50px 10px 50px",
              }}
            >
              <div
                id="3"
                style={{
                  backgroundColor: "#F5F5F5",
                  border: "1px solid 1px solid 1px solid #C5E3FC",
                  boxShadow: "0px 0px 7px 7px rgba(0,0,0,0.3)",
                  position: "relative",
                  padding: "5px 10px 5px 5px",
                  margin: "5px 50px 5px 50px",
                }}
              >
                <div
                  id="topbutton"
                  style={{
                    display: "flex",
                    gap: 10,
                    position: "relative",
                    paddingBottom: 5,
                    paddingLeft: 5,
                    paddingTop: 5,
                  }}
                >
                  <>
                    <Button
                      style={{
                        paddingLeft: "100px",
                        position: "absolute",
                      }}
                      name=" button"
                      onClick={HandleModal}
                      // value="default"
                  
                    >
                      {data?.dE !== undefined ? "Update": "Save"}
                    </Button>
                    {onHide && (
                            <SaveModal edit={data?.dE !== undefined} defaultValue={data?.dE} config={state}  id={id} hide={!onHide} onClose={() => setOnHide(false)} />
                    )}
                  </>
                  <DropdownButton
                    component={
                      <FlyoutMenu>
                        <MenuItem label="PNG" onClick={handleExportPNG} />
                        <MenuItem label="PDF" onClick={handleExportPDF} />
                      </FlyoutMenu>
                    }
                    name="buttonName"
                    value="buttonValue"
                    // disabled="Disabled button"
                  >
                    Export
                  </DropdownButton>
                  

                  <Button name="Disabled button" value="default">
                    Dashboard
                  </Button>
                  <Steps
                    steps={steps}
                    enabled={openHelper}
                    onExit={() => setOpenHelper(false)}
                    initialStep={0}
                  />
                  <Button
                    id="help3"
                    name="Disabled button"
                    value="default"
                    onClick={() => setOpenHelper(true)}
                  >
                    Help
                  </Button>
                </div>
                <PivotTableUI
                  onChange={(s) => setState(s)}
                  renderers={Object.assign({}, PlotlyRenderers)}
                  {...state}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
