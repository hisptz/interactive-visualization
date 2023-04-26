import {useNavigate} from 'react-router-dom'
import {Button} from "@dhis2/ui"

export function Visualizations() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Visualization</h1>
            <Button onClick={() => navigate('45')}>Go to one visualization</Button>
            

        </div>
    )
}
