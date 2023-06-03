import { useNavigate } from 'react-router-dom';
import files from '../../files.png';
import styles from '../../App.module.css';
import { NoticeBox, Button, TableFoot, FileInputField, DataTable, CircularLoader, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell } from '@dhis2/ui';
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
                    <NoticeBox title="Information">
                        Upload data file to generate visualization

                        <FileInputField label={null} name="uploadName" className={
                            styles.upload
                        } />
                    </NoticeBox>
                </div>


                <div style={{
                    display: 'flex',
                    alignItems:"center"

                }}>
                    <div style={{
                        flex: '10',
                        padding:20,
                        marginRight:1,
                        paddingBottom:180,
                        marginTop:2,
                        paddingTop:10
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
                    </div>
                    <div style={{
                        flex: '1',
                        paddingTop:10,
                        marginRight:50,
                        alignItems:"center"
                    }}>
                        <img src={files} width={'350px'} alt="Interactive Data Visualization" />
                        <h4
                            style={
                                {textAlign:"center"}
                            }> Welcome to Interactive Visualization ! </h4>
                    </div>
                </div>
            </div>
            <div className={styles.back}>
                <Button onClick={() => navigate('45')}>Go to one visualization</Button>
            </div>
        </div>

    )
}