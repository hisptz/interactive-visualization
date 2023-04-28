import {useNavigate} from 'react-router-dom'
import { NoticeBox, Button, FileInputField, DataTable, TableHead, DataTableRow, DataTableColumnHeader,TableBody, DataTableCell} from '@dhis2/ui'

export function Visualizations() {
    const navigate = useNavigate();
    return (
        <div>
            <div id='forbox'
                style={{
                    width: '96%',
                    left: '2%',
                    top: '70px',
                    position: 'absolute',
                }}>
            <NoticeBox
                style={{
                    color: "white",
                    alignItems: 'center',
                    position: 'absolute',
                    height:'400px'
                }}
                title="Information">

                Upload a data file to generate visualizations

                <div id='foruploadbtn'
                    style={{
                        //height: '10%',
                        left: '80%',
                        top: '0px',
                        position: 'absolute',
                        padding: "10px 20px",
                    }}>
                    <FileInputField name="uploadName" />
                </div>
            </NoticeBox>
            </div>

            <div id='fortable'
            style={{
                left: '1cm',
                top: '200px',
                position: 'absolute'
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
                            Aggregate COVID-19  Immunization in Tanzania for the year 2022
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


            <div
                style={{
                    left: '50%',
                    top: '70%',
                    position: 'absolute'
                }}>
            <Button onClick={() => navigate('45')}>Go to one visualization</Button>
            </div>

        </div>
    )
}
