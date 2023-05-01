import { useNavigate } from 'react-router-dom';
import files from '../../files.png';
import { NoticeBox, Button, FileInputField, DataTable, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell } from '@dhis2/ui';

function FileInputPage() {
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        history.push('/new-page'); // Navigate to a new page when a file is selected
    }

    return (
        <div id= 'wrap'>
            <form>
                <label htmlFor="uploadName">Choose a file:</label>
                <input
                    type="file"
                    id="uploadName"
                    name="uploadName"
                    onChange={handleFileChange}
                />
            </form>
        </div>
    );
}

export function Visualizations() {
    const navigate = useNavigate();
    return (
        <div>
        <div>
            <div id='forbox'
                 style={{
                     width: '96%',
                     left: '2%',
                     top: '70px',
                     position: 'absolute',
                 }}>
                <NoticeBox title="Information">

                    Upload data file to generate a visualization

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


                <div
                    style={{
                        left: '130%',
                        top: '0%',
                        position: 'absolute',
                        width: '450px',
                    }}
                >
                    <div style={{ position: 'relative' }}>
                        <img src={files} width={'350px'} alt="DVT" />
                        <h4 style={{
                            position: 'absolute',
                            left: '50%',
                            top: '100%',
                            transform: 'translateX(-50%)',
                            width: '350px'
                        }}>
                            Welcome to <span style={{ fontWeight: 'bold' }}>Interactive Visualization</span>!
                        </h4>
                    </div>

                </div>






            </div>


            <div
                style={{
                    left: '50%',
                    top: '90%',
                    position: 'absolute'
                }}>
            <Button onClick={() => navigate('45')}>Go to one visualization</Button>
            </div>
</div>
        </div>
    )
}
