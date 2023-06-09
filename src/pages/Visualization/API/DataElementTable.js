import {useDataQuery, DataQuery} from "@dhis2/app-runtime";
import React, {useState} from "react";
import {CircularLoader, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead} from "@dhis2/ui"

const query = {
    dE: {
        resource: "dataStore/visualization",
        params: (dynamicParams) =>{

            const page = dynamicParams.page
            return {
                fields: [
                    "id",
                    "name",
                    "status",
                    "createdAt"
                ],
                page: page,
                pageSize: 10,
                totalPages: true
            }
        }
    }
}


export function DataElementTable(){
    const queryData = useDataQuery(query)

    const data = queryData.data?.dE;
    const loading = queryData.loading;
    const error = queryData.error;

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
        <div style={{padding: 32}} >
            
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>
                            No
                        </TableCellHead>
                        <TableCellHead>
                            Name
                        </TableCellHead>
                        <TableCellHead>
                            Status
                        </TableCellHead>
                        <TableCellHead>
                            CreatedAt
                        </TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {
                        data?.entries?.map((dataElement, index) => (
                            <TableRow key={`${dataElement.id}-row`}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    {dataElement.name}
                                </TableCell>
                                <TableCell>
                                    {dataElement.status}
                                </TableCell>
                                <TableCell>
                                    {dataElement.createdAt}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            
        </div>
    )
}
