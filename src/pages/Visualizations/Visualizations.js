import {useNavigate} from 'react-router-dom'
import {NoticeBox, Button, FileInputField} from '@dhis2/ui'

export function Visualizations() {
    const navigate = useNavigate();
    return (
        <div>

            <div
                style={{
                    height: '20%',
                    width: '96%',
                    left: '2%',
                    top: '70px',
                    position: 'absolute',


                }}>
            <NoticeBox
                style={{
                    //padding: "10px 20px",
                    //textAlign: "center",
                    color: "white",
                    alignItems: 'center',
                    position: 'absolute',
                    height:'400px'
                }}
                title="Information">

                Upload a data file to generate visualizations

                <div
                    style={{
                        //height: '10%',
                        left: '84%',
                        top: '00px',
                        position: 'absolute',
                        padding: "10px 20px",
                        //textAlign: "center",
                    }}>
                    <FileInputField name="uploadName" />
                </div>


            </NoticeBox>
            </div>


            <Button onClick={() => navigate('45')}>Go to one visualization</Button>
            

        </div>
    )
}
