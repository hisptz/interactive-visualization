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
    return (
        <div
            style={{
                    backgroundColor: 'darkgray',
                    }}>
            <h1 style={{
                    left: '120px',
                    top: '55px',
                    position: 'absolute',
                    fontSize: '20px'
                }}>Aggregate COVID-19 Immunization in Tanzania for the year {id},to {params.pe} {params.ou}!</h1>

            <div id='gobackbutton'
                style={{
                    left: '30px',
                    top: '60px',
                    position: 'absolute',
                }}>

                <Button onClick={()=> navigate(-1)} name="Basic button" value="default">
                    Go Back
                </Button>
            </div>




            <div
                style={{
                    backgroundColor: 'whitesmoke',
                    border: '1px solid 1px solid 1px solid #C5E3FC',
                    boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.2)',
                    height: '84%',
                    width: '95%',
                    display: 'flex',
                    left: '35px',
                    top: '100px',
                    position: 'absolute',
                    justifyContent:'center',
                    alignItems: 'center',
                }}>

                <div id='topbutton'
                     style={{
                         display: 'flex',
                         left: '-20px',
                         top: '12px',
                         position: 'absolute',
                         paddingLeft: '25px',
                     }}>
                    <Button
                        style={{
                            paddingLeft: '100px',position:'absolute',
                        }}
                        disabled name="Disabled button"
                        value="default">
                        Save
                    </Button>
                    <DropdownButton
                        component={<FlyoutMenu><MenuItem label="PNG" /><MenuItem label="PDF" /></FlyoutMenu>}
                        name="buttonName"
                        value="buttonValue"
                        disabled ="Disabled button"
                    >
                        Export
                    </DropdownButton>
                    <Button
                        disabled name="Disabled button"
                        value="default">
                        Settings
                    </Button>
                    <Button
                        disabled name="Disabled button"
                        value="default">
                        Save to Dashboard
                    </Button>
                </div>


                <PivotTableUI
                    data={data}
                    onChange={s => setState(s)}
                    renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                    {...state}
                />
            </div>
    </div>





    )
}