import { useNavigate } from 'react-router-dom';
import files from '../../files.png';
import styles from '../../App.module.css';
import { NoticeBox, Button, Pagination, FileInputField, DataTable, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell } from '@dhis2/ui';

export function Visualizations() {
    const navigate = useNavigate();
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
                    paddingRight:10,
                    paddingTop:5,
                    textAlign:"right"}}>
                    <Button
                        name="Basic button"
                        //onClick={logger}
                        value="default">
                        Help
                    </Button>
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