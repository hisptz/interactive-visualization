import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import {useState} from 'react';
import {Button, DropdownButton, FlyoutMenu, MenuItem} from "@dhis2/ui";
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);
const data = [['attribute', 'attribute2'], ['value1', 'value2']];


export function Visualization() {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);


    const handleSave = () =>{
        // API calls to save files to the db go here
        setLoading(true);
        setTimeout(()=>setLoading(false), 10000)
    }
    const handleSettingButton = (label)=>{
        console.log(label);
    }
    return (

        <div id='main'
        style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#F5F5F5",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}>

                <div id='back_button'
                style={{
                    position: 'absolute',
                    top: 35,
                    left: 0,
                    margin: '1em',
                }}>
                <Button onClick={()=> navigate(-1)} name="Small button" small value="default">
                    Go Back
                </Button>
                </div>



                <div id='datatitle'>
                <h1 style={{
                    left: 120,
                    top: 43,
                    position: 'absolute',
                    fontSize: '18px',
                }}>This will display the title of the data file Visualized {id},to {params.pe} {params.ou}!</h1>

                </div>

                <div id='plotly_layout'
                style={{
                    height: "88%",
                    width: "96%",
                    backgroundColor: "white",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: '1px solid 1px solid 1px solid #C5E3FC',
                    boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.3)',
                }}>

                <div id='topbuttons'
                style={{
                    display: 'flex',
                    flexdirection: 'row',
                    alignitems: 'flex-start',
                    padding: '5px 10px',
                    gap: '10px',
                    position: 'absolute',
                    width: '56px',
                    height: '36px',
                    left: '30px',
                    top: '100px',
                    }}>
                <Button loading={loading} onClick={handleSave} name="SaveButton" small value="default" >{!loading?  "Save" : "Saving..." }</Button>
 
                <DropdownButton
                component={
                <FlyoutMenu>
                    <MenuItem label="PNG" />
                    <MenuItem label="PDF" /> 
                </FlyoutMenu>
                           }
                name="buttonName"
                small value="buttonValue"> Export
                 </DropdownButton>
                 <DropdownButton small component={
                    <FlyoutMenu dense>
                        <MenuItem onClick={(color)=>handleSettingButton(color)} label="Color" />
                        <MenuItem onClick={(status)=>handleSettingButton(status)} label="Status" />
                    </FlyoutMenu>
                    }>Settings</DropdownButton>

                {/* <Button name="Small button" small value="default" > Settings </Button> */}

                <Button name="Small button" small value="default" > Dashboard </Button>
            </div>




                <div id='plotly' style={{backgroundColor:'greenyellow' }}>
                <PivotTableUI 
                data={data}
                onChange={s => setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...state}
         />    
        </div>

    </div>

</div>







        





    )
}
