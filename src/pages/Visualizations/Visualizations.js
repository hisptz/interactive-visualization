import { useNavigate } from 'react-router-dom';
import { Steps } from "intro.js-react";
import React, {useState} from "react"
//import files from '../../files.png';
import styles from '../../App.module.css';
import 'intro.js/introjs.css';
import { NoticeBox, Button, Pagination, FileInputField, DataTable, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell } from '@dhis2/ui';

// Helper
const steps = [
    {
        selector: "#help2",
        intro: "Click the 'Upload a file' button to upload a data file in CSV, Excel or JSON format from your local computer."
    },
    {
        element: '#back1',
        intro: 'Or select a row of the table to Visualize data that is already saved to the system.',
    },
]

export function Visualizations() {
    const navigate = useNavigate();
    const [openHelper, setOpenHelper] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.notice_box}>
                <div >
                    <NoticeBox title="Information">
                        Upload data file to generate visualization

                        <FileInputField label={null} name="uploadName" className={
                            styles.upload
                        } />
                    </NoticeBox>
                </div>

                <div style={{
                    paddingTop:10,
                    justifyContent:'end',
                    display:'flex',
                    gap:7
                }}>
                    <Steps
                steps={steps}
                enabled={openHelper}
                onExit={() => setOpenHelper(false)}
                initialStep={0}
            />
            
                <Button
                    id='back1'
                    name="Basic button"
                    value="default"
                    onClick={() => navigate(-1)}>
                     Back
                </Button>

                <Button
                    id='help2'
                    name="Basic button"
                    value="default"
                    onClick={() => setOpenHelper(true)}>
                     Help
                </Button>
                
                </div>


                <div style={{
                    display: 'flex',
                    alignItems:"center"

                }}>
                    <div style={{
                        flex: '10',
                        padding:10,
                        paddingTop:10
                    }}>
                        <DataTable>
                            <TableHead>
                                <DataTableRow>
                                    <DataTableColumnHeader>
                                        S/N
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader>
                                        Name
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader>
                                        Status
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader>
                                        Date Created
                                    </DataTableColumnHeader>
                                </DataTableRow>
                            </TableHead>
                            <TableBody>
                                <DataTableRow>
                                    <DataTableCell bordered={true}>
                                        1.
                                    </DataTableCell>
                                    <DataTableCell>
                                        Aggregate COVID-19 Immunization in Tanzania for the year 2022
                                    </DataTableCell>
                                    <DataTableCell>
                                        Public
                                    </DataTableCell>
                                    <DataTableCell>
                                        04/12/2022
                                    </DataTableCell>
                                </DataTableRow>
                                <DataTableRow>
                                    <DataTableCell>
                                        2.
                                    </DataTableCell>
                                    <DataTableCell>
                                        Medical Expenditure Data Survey 2022
                                    </DataTableCell>
                                    <DataTableCell>
                                        Private
                                    </DataTableCell>
                                    <DataTableCell>
                                        12/12/2022
                                    </DataTableCell>
                                </DataTableRow>
                                <DataTableRow>
                                    <DataTableCell>
                                    </DataTableCell>
                                    <DataTableCell>
                                    </DataTableCell>
                                    <DataTableCell>
                                    </DataTableCell>
                                    <DataTableCell>
                                    </DataTableCell>
                                </DataTableRow>
                            </TableBody>
                        </DataTable>
                        <Pagination
                            disabled
                            isFirstPage
                            //onPageChange={logOnPageChange}
                            //onPageSizeChange={logOnPageSizeChange}
                            page={1}
                            pageSize={10}
                        />
                    </div>

                    {/* <div style={{
                        flex: '1',
                        paddingTop:5,
                        marginRight:50,
                        alignItems:"center"
                    }}>

                        <img src={files} width={'350px'} alt="Interactive Data Visualization" />
                        <h4
                            style={
                                {textAlign:"center"}
                            }> Welcome to Interactive Visualization ! </h4>
                    </div> */}
                </div>
            </div>
            <div className={styles.back}>
                <Button onClick={() => navigate('45')}>Start Visualizing</Button>
            </div>
        </div>

    )
}