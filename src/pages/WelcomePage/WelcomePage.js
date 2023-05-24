import {useNavigate} from "react-router";
import { Steps } from "intro.js-react";
import {Button} from "@dhis2/ui"
import React, {useState} from "react"
import files from '../../files.png';


const steps = [
    {
        selector: "#help1",
        intro: "This tool enhances DHIS2 by enabling analysis of external data sources not found within the DHIS2 warehouse. It empowers users to gain insights and discover patterns through interactive visualizations, providing valuable data analysis capabilities."
    }
]

export function WelcomePage() {
    const navigate = useNavigate();
    const [openHelper, setOpenHelper] = useState(false);

    return (
        <div style={{
            textAlign: 'center',
            padding: '20px',
            paddingRight:100,
            paddingLeft:100,
            justifyContent:"center",
            position:"relative",
            marginTop:50
        }}>

                    <div style={{
                        flex: '1',
                        paddingTop:5,
                        marginRight:50,
                        alignItems:"center"
                    }}>

                        <img src={files} width={'350px'} alt="Interactive Data Visualization" />
                    </div>
            <Steps
                steps={steps}
                enabled={openHelper}
                onExit={() => setOpenHelper(false)}
                initialStep={0}
            />
            <h1>Welcome to Interactive Data Visualization Tool ! </h1>
            {/* <p style={{ margin: '10px 0' }}>This tool is designed specifically for DHIS2, enabling you to analyze data from external sources that are not available within the DHIS2 warehouse. With this powerful tool, you can gain valuable insights and uncover patterns in your data through interactive visualizations.</p>
            <p style={{ margin: '10px 0' }}>To get started, simply click on the "Start Using the Tool" button. This will take you to the main interface, where you can explore your data, create custom visualizations, and perform in-depth analysis. The intuitive and user-friendly interface makes it easy to navigate and interact with your data.</p>
            <p style={{ margin: '10px 0' }}>If you need assistance or guidance on how to use the tool effectively, click on the "Show Help" button. This will provide you with step-by-step instructions, tips, and examples to maximize your experience and make the most out of the tool's capabilities.</p>
            <p style={{ margin: '10px 0' }}>Experience the power of data visualization and unlock new insights with our Interactive Data Visualization Tool for DHIS2. Start exploring your data and gain valuable insights today!</p> */}
            <div style={{gap:20, position:"relative", display:"flex", justifyContent:"center", paddingTop:30}}>
                <Button id="help1"  large name="Large button" onClick={() => setOpenHelper(true) }>Help</Button>
                <Button  large name="Large button" onClick={() => navigate("/visualization")}>Get started</Button>
            </div>

        </div>



    )
}