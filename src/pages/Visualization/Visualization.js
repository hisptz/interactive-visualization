import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import {useState} from 'react';

import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injectio  n
const PlotlyRenderers = createPlotlyRenderers(Plot);
const data = [['attribute', 'attribute2'], ['value1', 'value2']];


export function Visualization() {
    const [state, setState] = useState({});
    return (
        <div>
            <PivotTableUI
                data={data}
                onChange={s => setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...state}
            />
        </div>
    )
}
