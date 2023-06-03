import {useNavigate} from "react-router";

import {Button} from "@dhis2/ui"


export function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div style={{
            textAlign: 'center',
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column"
        }}>
            <h1>Welcome Page</h1>
            <p style={{margin: 0}}>This is the welcome page</p>
            <Button onClick={() => navigate("/visualization")}>Go to Visualization</Button>
        </div>
    )
}
