import { useNavigate } from 'react-router-dom';
import { Steps } from "intro.js-react";
import React, {useState} from "react"
import styles from '../../App.module.css';
import 'intro.js/introjs.css';
import { NoticeBox, Button, Pagination, DataTable, CircularLoader, 
    TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell } from '@dhis2/ui';
import FileUploader from './FileUpload';

// Helper
const steps = [
    {
        selector: "#help2",
        intro: "Click the 'Upload a file' button to upload a data file in CSV, Excel or JSON format from your local computer."
    },
    {
        element: '#back1',
        intro: "To visualize data already saved in the system, simply select a row from the table. This feature empowers users to conveniently analyze and gain insights from the existing data, enhancing their data visualization and exploration capabilities within the app."
    },
]
import { useDataMutation, useDataQuery} from '@dhis2/app-runtime';




const query = {
    dE: {
        resource: "dataStore/visualization",
        params: (dynamicParams) =>{

            const page = dynamicParams.page
            return {
                fields: [
                    "id",
                    "name",
                    "status"
                ],
                page: page,
                pageSize: 10,
                totalPages: true
            }
        }
    }
}




export function API(){

   
   
   

}



export function Visualizations() {
    const queryData = useDataQuery(query)
        

    const data = queryData.data?.dE;
    const loading = queryData.loading;
    const error = queryData.error;

    const navigate = useNavigate();
    const [openHelper, setOpenHelper] = useState(false);


    if (loading) {
        return (
            <div >
                <CircularLoader small/>
                <h3>Loading data elements</h3>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h3>{error.message}</h3>
            </div>
        )
    }


    return (
        <div className={styles.container}>
            <div className={styles.notice_box}>
                <div >

                    <div
                    style={{
                        paddingBottom:10,
                        gap:5,
                        display:"flex"
                    }}>
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
                    <NoticeBox title="Information">
                        Upload data file to generate a visualization

                    <FileUploader/>
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
                </div>

                    <div style={{
                        paddingTop:15
                    }}>
                        <DataTable>
                            <TableHead>
                                <DataTableRow>
                                    <DataTableColumnHeader>
                                        No
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
                   {
                        data?.dataElements?.map((dataElement, index) => (
                            <TableRow key={`${dataElement.id}-row`}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    {dataElement.Name}
                                </TableCell>
                                <TableCell>
                                    {dataElement.Status}
                                </TableCell>
                                <TableCell>
                                    {dataElement.dateCreated}
                                </TableCell>
                            </TableRow>
                        ))
                    }
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
                </div>
            <div className={styles.back}>
                <Button onClick={() => navigate('45')}>Start Visualizing</Button>
            </div>
        </div>

    )
}