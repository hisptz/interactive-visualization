import { useNavigate } from 'react-router-dom';
import files from '../../file2.png';
import { NoticeBox, Button, FileInputField, DataTable, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell } from '@dhis2/ui';

export function Visualizations() {
    const navigate = useNavigate();
    return (
        <div id='main' 
        style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#F5F5F5",
            fontSize: "24px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            }}>



        <div id='noticebox'
        style={{
            width: '96%',
            textAlign:'justify',
            padding: "10px 0px",
            justifyContent:'end'
        }}>
        <NoticeBox title="Information">
            Upload a Data file to generate a Visualization
        <FileInputField
        //helpText="Please select any file type"
        name="uploadName"/>

        </NoticeBox>

        <div id='image'
        style={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          marginRight: 70,
          marginTop:30

        }}>
            <img src={files} width={'350px'} alt="DVT" />

        </div>

        <div id='data_table'
                 style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    width: '800px',
                    top: '250px',
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
                </div>
        </div>

            <div id='temporary'
                style={{
                    left: '50%',
                    top: '90%',
                    position: 'absolute'
                }}>
                <Button onClick={() => navigate('45')}>Go to one visualization</Button>
            </div>


        </div>

    )
}