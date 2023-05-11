import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import {useState} from 'react';
import {Button, DropdownButton, FlyoutMenu, MenuItem} from "@dhis2/ui";
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import Plot from 'react-plotly.js';
// create Plotly React component via dependency injection
// const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);
const data = [
    ["Total Bill","Tip","Payer Gender","Payer Smoker","Day of Week","Meal","Party Size"],
    [16.99,1.01,"Female","Non-Smoker","Sunday","Dinner",2],
    [10.34,1.66,"Male","Non-Smoker","Sunday","Dinner",3],
    [21.01,3.5,"Male","Non-Smoker","Sunday","Dinner",3],
    [23.68,3.31,"Male","Non-Smoker","Sunday","Dinner",2],
    [24.59,3.61,"Female","Non-Smoker","Sunday","Dinner",4],
    [25.29,4.71,"Male","Non-Smoker","Sunday","Dinner",4],
    [8.77,2,"Male","Non-Smoker","Sunday","Dinner",2],
    [26.88,3.12,"Male","Non-Smoker","Sunday","Dinner",4],
    [15.04,1.96,"Male","Non-Smoker","Sunday","Dinner",2],
    [14.78,3.23,"Male","Non-Smoker","Sunday","Dinner",2],
    [10.27,1.71,"Male","Non-Smoker","Sunday","Dinner",2],
    [35.26,5,"Female","Non-Smoker","Sunday","Dinner",4],
    [15.42,1.57,"Male","Non-Smoker","Sunday","Dinner",2],
    [18.43,3,"Male","Non-Smoker","Sunday","Dinner",4],
    [14.83,3.02,"Female","Non-Smoker","Sunday","Dinner",2],
    [21.58,3.92,"Male","Non-Smoker","Sunday","Dinner",2],
    [10.33,1.67,"Female","Non-Smoker","Sunday","Dinner",3],
    [16.29,3.71,"Male","Non-Smoker","Sunday","Dinner",3],
    [16.97,3.5,"Female","Non-Smoker","Sunday","Dinner",3],
    [20.65,3.35,"Male","Non-Smoker","Saturday","Dinner",3],
    [17.92,4.08,"Male","Non-Smoker","Saturday","Dinner",2],
    [20.29,2.75,"Female","Non-Smoker","Saturday","Dinner",2],
    [15.77,2.23,"Female","Non-Smoker","Saturday","Dinner",2],
    [39.42,7.58,"Male","Non-Smoker","Saturday","Dinner",4],
    [19.82,3.18,"Male","Non-Smoker","Saturday","Dinner",2],
    [17.81,2.34,"Male","Non-Smoker","Saturday","Dinner",4],
    [13.37,2,"Male","Non-Smoker","Saturday","Dinner",2],
    [12.69,2,"Male","Non-Smoker","Saturday","Dinner",2],
    [21.7,4.3,"Male","Non-Smoker","Saturday","Dinner",2],
    [19.65,3,"Female","Non-Smoker","Saturday","Dinner",2],
    [9.55,1.45,"Male","Non-Smoker","Saturday","Dinner",2],
    [18.35,2.5,"Male","Non-Smoker","Saturday","Dinner",4],
    [15.06,3,"Female","Non-Smoker","Saturday","Dinner",2],
    [20.69,2.45,"Female","Non-Smoker","Saturday","Dinner",4],
    [17.78,3.27,"Male","Non-Smoker","Saturday","Dinner",2],
    [24.06,3.6,"Male","Non-Smoker","Saturday","Dinner",3],
    [16.31,2,"Male","Non-Smoker","Saturday","Dinner",3],
    [16.93,3.07,"Female","Non-Smoker","Saturday","Dinner",3],
    [18.69,2.31,"Male","Non-Smoker","Saturday","Dinner",3],
    [31.27,5,"Male","Non-Smoker","Saturday","Dinner",3],
    [16.04,2.24,"Male","Non-Smoker","Saturday","Dinner",3],
    [17.46,2.54,"Male","Non-Smoker","Sunday","Dinner",2],
    [13.94,3.06,"Male","Non-Smoker","Sunday","Dinner",2],
    [9.68,1.32,"Male","Non-Smoker","Sunday","Dinner",2],
    [30.4,5.6,"Male","Non-Smoker","Sunday","Dinner",4],
    [18.29,3,"Male","Non-Smoker","Sunday","Dinner",2],
    [22.23,5,"Male","Non-Smoker","Sunday","Dinner",2],
    [32.4,6,"Male","Non-Smoker","Sunday","Dinner",4],
    [28.55,2.05,"Male","Non-Smoker","Sunday","Dinner",3],
    [18.04,3,"Male","Non-Smoker","Sunday","Dinner",2],
    [12.54,2.5,"Male","Non-Smoker","Sunday","Dinner",2],
    [10.29,2.6,"Female","Non-Smoker","Sunday","Dinner",2],
    [34.81,5.2,"Female","Non-Smoker","Sunday","Dinner",4],
    [9.94,1.56,"Male","Non-Smoker","Sunday","Dinner",2],
    [25.56,4.34,"Male","Non-Smoker","Sunday","Dinner",4],
    [19.49,3.51,"Male","Non-Smoker","Sunday","Dinner",2],
    [38.01,3,"Male","Smoker","Saturday","Dinner",4],
    [26.41,1.5,"Female","Non-Smoker","Saturday","Dinner",2],
    [11.24,1.76,"Male","Smoker","Saturday","Dinner",2],
    [48.27,6.73,"Male","Non-Smoker","Saturday","Dinner",4],
    [20.29,3.21,"Male","Smoker","Saturday","Dinner",2],
    [13.81,2,"Male","Smoker","Saturday","Dinner",2],
    [11.02,1.98,"Male","Smoker","Saturday","Dinner",2],
    [18.29,3.76,"Male","Smoker","Saturday","Dinner",4],
    [17.59,2.64,"Male","Non-Smoker","Saturday","Dinner",3],
    [20.08,3.15,"Male","Non-Smoker","Saturday","Dinner",3],
    [16.45,2.47,"Female","Non-Smoker","Saturday","Dinner",2],
    [3.07,1,"Female","Smoker","Saturday","Dinner",1],
    [20.23,2.01,"Male","Non-Smoker","Saturday","Dinner",2],
    [15.01,2.09,"Male","Smoker","Saturday","Dinner",2],
    [12.02,1.97,"Male","Non-Smoker","Saturday","Dinner",2],
    [17.07,3,"Female","Non-Smoker","Saturday","Dinner",3],
    [26.86,3.14,"Female","Smoker","Saturday","Dinner",2],
    [25.28,5,"Female","Smoker","Saturday","Dinner",2],
    [14.73,2.2,"Female","Non-Smoker","Saturday","Dinner",2],
    [10.51,1.25,"Male","Non-Smoker","Saturday","Dinner",2],
    [17.92,3.08,"Male","Smoker","Saturday","Dinner",2],
    [27.2,4,"Male","Non-Smoker","Thursday","Lunch",4],
    [22.76,3,"Male","Non-Smoker","Thursday","Lunch",2],
    [17.29,2.71,"Male","Non-Smoker","Thursday","Lunch",2],
    [19.44,3,"Male","Smoker","Thursday","Lunch",2],
    [16.66,3.4,"Male","Non-Smoker","Thursday","Lunch",2],
    [10.07,1.83,"Female","Non-Smoker","Thursday","Lunch",1],
    [32.68,5,"Male","Smoker","Thursday","Lunch",2],
    [15.98,2.03,"Male","Non-Smoker","Thursday","Lunch",2],
    [34.83,5.17,"Female","Non-Smoker","Thursday","Lunch",4],
    [13.03,2,"Male","Non-Smoker","Thursday","Lunch",2],
    [18.28,4,"Male","Non-Smoker","Thursday","Lunch",2],
    [24.71,5.85,"Male","Non-Smoker","Thursday","Lunch",2],
    [21.16,3,"Male","Non-Smoker","Thursday","Lunch",2],
    [28.97,3,"Male","Smoker","Friday","Dinner",2],
    [22.49,3.5,"Male","Non-Smoker","Friday","Dinner",2],
    [5.75,1,"Female","Smoker","Friday","Dinner",2],
    [16.32,4.3,"Female","Smoker","Friday","Dinner",2],
    [22.75,3.25,"Female","Non-Smoker","Friday","Dinner",2],
    [40.17,4.73,"Male","Smoker","Friday","Dinner",4],
    [27.28,4,"Male","Smoker","Friday","Dinner",2],
    [12.03,1.5,"Male","Smoker","Friday","Dinner",2],
    [21.01,3,"Male","Smoker","Friday","Dinner",2],
    [12.46,1.5,"Male","Non-Smoker","Friday","Dinner",2],
    [11.35,2.5,"Female","Smoker","Friday","Dinner",2],
    [15.38,3,"Female","Smoker","Friday","Dinner",2],
    [44.3,2.5,"Female","Smoker","Saturday","Dinner",3],
    [22.42,3.48,"Female","Smoker","Saturday","Dinner",2],
    [20.92,4.08,"Female","Non-Smoker","Saturday","Dinner",2],
    [15.36,1.64,"Male","Smoker","Saturday","Dinner",2],
    [20.49,4.06,"Male","Smoker","Saturday","Dinner",2],
    [25.21,4.29,"Male","Smoker","Saturday","Dinner",2],
    [18.24,3.76,"Male","Non-Smoker","Saturday","Dinner",2],
    [14.31,4,"Female","Smoker","Saturday","Dinner",2],
    [14,3,"Male","Non-Smoker","Saturday","Dinner",2],
    [7.25,1,"Female","Non-Smoker","Saturday","Dinner",1],
    [38.07,4,"Male","Non-Smoker","Sunday","Dinner",3],
    [23.95,2.55,"Male","Non-Smoker","Sunday","Dinner",2],
    [25.71,4,"Female","Non-Smoker","Sunday","Dinner",3],
    [17.31,3.5,"Female","Non-Smoker","Sunday","Dinner",2],
    [29.93,5.07,"Male","Non-Smoker","Sunday","Dinner",4],
    [10.65,1.5,"Female","Non-Smoker","Thursday","Lunch",2],
    [12.43,1.8,"Female","Non-Smoker","Thursday","Lunch",2],
    [24.08,2.92,"Female","Non-Smoker","Thursday","Lunch",4],
    [11.69,2.31,"Male","Non-Smoker","Thursday","Lunch",2],
    [13.42,1.68,"Female","Non-Smoker","Thursday","Lunch",2],
    [14.26,2.5,"Male","Non-Smoker","Thursday","Lunch",2],
    [15.95,2,"Male","Non-Smoker","Thursday","Lunch",2],
    [12.48,2.52,"Female","Non-Smoker","Thursday","Lunch",2],
    [29.8,4.2,"Female","Non-Smoker","Thursday","Lunch",6],
    [8.52,1.48,"Male","Non-Smoker","Thursday","Lunch",2],
    [14.52,2,"Female","Non-Smoker","Thursday","Lunch",2],
    [11.38,2,"Female","Non-Smoker","Thursday","Lunch",2],
    [22.82,2.18,"Male","Non-Smoker","Thursday","Lunch",3],
    [19.08,1.5,"Male","Non-Smoker","Thursday","Lunch",2],
    [20.27,2.83,"Female","Non-Smoker","Thursday","Lunch",2],
    [11.17,1.5,"Female","Non-Smoker","Thursday","Lunch",2],
    [12.26,2,"Female","Non-Smoker","Thursday","Lunch",2],
    [18.26,3.25,"Female","Non-Smoker","Thursday","Lunch",2],
    [8.51,1.25,"Female","Non-Smoker","Thursday","Lunch",2],
    [10.33,2,"Female","Non-Smoker","Thursday","Lunch",2],
    [14.15,2,"Female","Non-Smoker","Thursday","Lunch",2],
    [16,2,"Male","Smoker","Thursday","Lunch",2],
    [13.16,2.75,"Female","Non-Smoker","Thursday","Lunch",2],
    [17.47,3.5,"Female","Non-Smoker","Thursday","Lunch",2],
    [34.3,6.7,"Male","Non-Smoker","Thursday","Lunch",6],
    [41.19,5,"Male","Non-Smoker","Thursday","Lunch",5],
    [27.05,5,"Female","Non-Smoker","Thursday","Lunch",6],
    [16.43,2.3,"Female","Non-Smoker","Thursday","Lunch",2],
    [8.35,1.5,"Female","Non-Smoker","Thursday","Lunch",2],
    [18.64,1.36,"Female","Non-Smoker","Thursday","Lunch",3],
    [11.87,1.63,"Female","Non-Smoker","Thursday","Lunch",2],
    [9.78,1.73,"Male","Non-Smoker","Thursday","Lunch",2],
    [7.51,2,"Male","Non-Smoker","Thursday","Lunch",2],
    [14.07,2.5,"Male","Non-Smoker","Sunday","Dinner",2],
    [13.13,2,"Male","Non-Smoker","Sunday","Dinner",2],
    [17.26,2.74,"Male","Non-Smoker","Sunday","Dinner",3],
    [24.55,2,"Male","Non-Smoker","Sunday","Dinner",4],
    [19.77,2,"Male","Non-Smoker","Sunday","Dinner",4],
    [29.85,5.14,"Female","Non-Smoker","Sunday","Dinner",5],
    [48.17,5,"Male","Non-Smoker","Sunday","Dinner",6],
    [25,3.75,"Female","Non-Smoker","Sunday","Dinner",4],
    [13.39,2.61,"Female","Non-Smoker","Sunday","Dinner",2],
    [16.49,2,"Male","Non-Smoker","Sunday","Dinner",4],
    [21.5,3.5,"Male","Non-Smoker","Sunday","Dinner",4],
    [12.66,2.5,"Male","Non-Smoker","Sunday","Dinner",2],
    [16.21,2,"Female","Non-Smoker","Sunday","Dinner",3],
    [13.81,2,"Male","Non-Smoker","Sunday","Dinner",2],
    [17.51,3,"Female","Smoker","Sunday","Dinner",2],
    [24.52,3.48,"Male","Non-Smoker","Sunday","Dinner",3],
    [20.76,2.24,"Male","Non-Smoker","Sunday","Dinner",2],
    [31.71,4.5,"Male","Non-Smoker","Sunday","Dinner",4],
    [10.59,1.61,"Female","Smoker","Saturday","Dinner",2],
    [10.63,2,"Female","Smoker","Saturday","Dinner",2],
    [50.81,10,"Male","Smoker","Saturday","Dinner",3],
    [15.81,3.16,"Male","Smoker","Saturday","Dinner",2],
    [7.25,5.15,"Male","Smoker","Sunday","Dinner",2],
    [31.85,3.18,"Male","Smoker","Sunday","Dinner",2],
    [16.82,4,"Male","Smoker","Sunday","Dinner",2],
    [32.9,3.11,"Male","Smoker","Sunday","Dinner",2],
    [17.89,2,"Male","Smoker","Sunday","Dinner",2],
    [14.48,2,"Male","Smoker","Sunday","Dinner",2],
    [9.6,4,"Female","Smoker","Sunday","Dinner",2],
    [34.63,3.55,"Male","Smoker","Sunday","Dinner",2],
    [34.65,3.68,"Male","Smoker","Sunday","Dinner",4],
    [23.33,5.65,"Male","Smoker","Sunday","Dinner",2],
    [45.35,3.5,"Male","Smoker","Sunday","Dinner",3],
    [23.17,6.5,"Male","Smoker","Sunday","Dinner",4],
    [40.55,3,"Male","Smoker","Sunday","Dinner",2],
    [20.69,5,"Male","Non-Smoker","Sunday","Dinner",5],
    [20.9,3.5,"Female","Smoker","Sunday","Dinner",3],
    [30.46,2,"Male","Smoker","Sunday","Dinner",5],
    [18.15,3.5,"Female","Smoker","Sunday","Dinner",3],
    [23.1,4,"Male","Smoker","Sunday","Dinner",3],
    [15.69,1.5,"Male","Smoker","Sunday","Dinner",2],
    [19.81,4.19,"Female","Smoker","Thursday","Lunch",2],
    [28.44,2.56,"Male","Smoker","Thursday","Lunch",2],
    [15.48,2.02,"Male","Smoker","Thursday","Lunch",2],
    [16.58,4,"Male","Smoker","Thursday","Lunch",2],
    [7.56,1.44,"Male","Non-Smoker","Thursday","Lunch",2],
    [10.34,2,"Male","Smoker","Thursday","Lunch",2],
    [43.11,5,"Female","Smoker","Thursday","Lunch",4],
    [13,2,"Female","Smoker","Thursday","Lunch",2],
    [13.51,2,"Male","Smoker","Thursday","Lunch",2],
    [18.71,4,"Male","Smoker","Thursday","Lunch",3],
    [12.74,2.01,"Female","Smoker","Thursday","Lunch",2],
    [13,2,"Female","Smoker","Thursday","Lunch",2],
    [16.4,2.5,"Female","Smoker","Thursday","Lunch",2],
    [20.53,4,"Male","Smoker","Thursday","Lunch",4],
    [16.47,3.23,"Female","Smoker","Thursday","Lunch",3],
    [26.59,3.41,"Male","Smoker","Saturday","Dinner",3],
    [38.73,3,"Male","Smoker","Saturday","Dinner",4],
    [24.27,2.03,"Male","Smoker","Saturday","Dinner",2],
    [12.76,2.23,"Female","Smoker","Saturday","Dinner",2],
    [30.06,2,"Male","Smoker","Saturday","Dinner",3],
    [25.89,5.16,"Male","Smoker","Saturday","Dinner",4],
    [48.33,9,"Male","Non-Smoker","Saturday","Dinner",4],
    [13.27,2.5,"Female","Smoker","Saturday","Dinner",2],
    [28.17,6.5,"Female","Smoker","Saturday","Dinner",3],
    [12.9,1.1,"Female","Smoker","Saturday","Dinner",2],
    [28.15,3,"Male","Smoker","Saturday","Dinner",5],
    [11.59,1.5,"Male","Smoker","Saturday","Dinner",2],
    [7.74,1.44,"Male","Smoker","Saturday","Dinner",2],
    [30.14,3.09,"Female","Smoker","Saturday","Dinner",4],
    [12.16,2.2,"Male","Smoker","Friday","Lunch",2],
    [13.42,3.48,"Female","Smoker","Friday","Lunch",2],
    [8.58,1.92,"Male","Smoker","Friday","Lunch",1],
    [15.98,3,"Female","Non-Smoker","Friday","Lunch",3],
    [13.42,1.58,"Male","Smoker","Friday","Lunch",2],
    [16.27,2.5,"Female","Smoker","Friday","Lunch",2],
    [10.09,2,"Female","Smoker","Friday","Lunch",2],
    [20.45,3,"Male","Non-Smoker","Saturday","Dinner",4],
    [13.28,2.72,"Male","Non-Smoker","Saturday","Dinner",2],
    [22.12,2.88,"Female","Smoker","Saturday","Dinner",2],
    [24.01,2,"Male","Smoker","Saturday","Dinner",4],
    [15.69,3,"Male","Smoker","Saturday","Dinner",3],
    [11.61,3.39,"Male","Non-Smoker","Saturday","Dinner",2],
    [10.77,1.47,"Male","Non-Smoker","Saturday","Dinner",2],
    [15.53,3,"Male","Smoker","Saturday","Dinner",2],
    [10.07,1.25,"Male","Non-Smoker","Saturday","Dinner",2],
    [12.6,1,"Male","Smoker","Saturday","Dinner",2],
    [32.83,1.17,"Male","Smoker","Saturday","Dinner",2],
    [35.83,4.67,"Female","Non-Smoker","Saturday","Dinner",3],
    [29.03,5.92,"Male","Non-Smoker","Saturday","Dinner",3],
    [27.18,2,"Female","Smoker","Saturday","Dinner",2],
    [22.67,2,"Male","Smoker","Saturday","Dinner",2],
    [17.82,1.75,"Male","Non-Smoker","Saturday","Dinner",2],
    [18.78,3,"Female","Non-Smoker","Thursday","Dinner",2]
    ];
    



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





               

                <div id='plotly' style={{width: 1100, height: 300}}>
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
