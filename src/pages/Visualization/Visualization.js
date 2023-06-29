import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import { useState, useMemo, useEffect } from "react";
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
              This will display the title of the data file Visualized {id},to{" "}
              {params.pe} {params.ou}!
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
                        <MenuItem label="PNG" onClick={() => {}} />
                        <MenuItem label="PDF" onClick={handleDownload} />
                      </FlyoutMenu>
                    }
                    name="buttonName"
                    value="buttonValue"
                    // disabled="Disabled button"
                  >
                    Export
                  </DropdownButton>
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
