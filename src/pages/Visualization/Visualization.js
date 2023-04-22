import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import {useState} from 'react';
import {Button} from "@dhis2/ui";
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injectio  n
const PlotlyRenderers = createPlotlyRenderers(Plot);
const data = [['attribute', 'attribute2'], ['value1', 'value2']];


export function Visualization() {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const [state, setState] = useState({});
    return (
        <div>
            <Button onClick={()=> navigate(-1)} >Back</Button>
            <h1>Visualization for {id}, {params.pe} {params.ou}!</h1>
            <PivotTableUI
                data={data}
                onChange={s => setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...state}
            />
        </div>
    )
}
