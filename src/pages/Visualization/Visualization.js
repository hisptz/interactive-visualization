import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import { useState } from "react";
import { Button, DropdownButton, FlyoutMenu, MenuItem } from "@dhis2/ui";
//import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
//import styles from '../../App.module.css';
import { container } from "plotly.js/src/traces/scatter/marker_colorbar";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as  htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';


// create Plotly React component via dependency injection
// const Plot = createPlotlyComponent(window.Plotly);
// "Visualize1", "Visualize2","Visualize3","Visualize4","Visualize5"
// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);


const query = {
  dE: {
      resource: "dataStore/visualization",
     id:({id})=>id

  }
}


export function Visualization() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [state, setState] = useState({});

  const [loading, setLoading] = useState(false);
 
  const [openHelper, setOpenHelper] = useState(false);
  const visualizationData =  useMemo(()=> data?.dE?.config ?? {data: data?.dE?.config ?.data ?? JSON.parse(localStorage.getItem(id))?? []}, [data]);

  console.log(state);
  useEffect(()=>{
     if(visualizationData){
        setState({
          ...visualizationData
        })
     }
  }, [visualizationData])



 
  //Export PDF
  const handleDownload = () => {
    const tableElement = document.querySelector(".pvtUi");

    html2canvas(tableElement)
      .then((canvas) => {
        const pdf = new jsPDF("p", "pt", "letter");
        const imgData = canvas.toDataURL("image/png");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("pivot_table.pdf");
      })
      .catch((err) => console.log(err));
  };

  // const [onClose, setOnClose] = useState('false');
  const [onHide, setOnHide] = useState(false);
  const HandleModal = () => {
    setOnHide(true);
  };
  if (loading) {
    return (
      <CircularLoader large />  
    )
  }

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
            Go Back
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
              This will display the title of the data file Visualized {id},to{" "}
              {params.pe} {params.ou}!
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                paddingBottom: 20,
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
                  margin: "10px 50px 10px 50px",
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
                  <Button
                    style={{
                      paddingLeft: "100px",
                      position: "absolute",
                    }}
                    name=" button" onClick={handleDownload}
                    value="default"
                  >
                    Save
                  </Button>
                  <DropdownButton
                    component={
                      <FlyoutMenu>
                        <MenuItem label="PNG" onClick={()=>{}}/>
                        <MenuItem label="PDF" onClick={handleDownload} />
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
                  data={data}
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
