import { useDataQuery, DataQuery } from "@dhis2/app-runtime";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import {CircularLoader,Table,TableBody,TableCell,TableCellHead,TableHead,TableRow,TableRowHead,} from "@dhis2/ui";

const query = {
  dE: {
    resource: "dataStore/visualization",
    params: (dynamicParams) => {
      const page = dynamicParams.page;
      return {
        fields: ["id", "name", "status", "createdAt"],
        page: page,
        pageSize: 10,
        totalPages: true,
      };
    },
  },
};

export function DataElementTable() {
  const queryData = useDataQuery(query);
    const navigate = useNavigate();
    const[selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (rowId) => {
    navigate(`${rowId}`);
  };
  const data = queryData.data?.dE;
  const loading = queryData.loading;
  const error = queryData.error;

  if (loading) {
    return (
      <div>
        <CircularLoader small />
        <h3>Loading data elements</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>No</TableCellHead>
            <TableCellHead>Name</TableCellHead>
            <TableCellHead>Status</TableCellHead>
            <TableCellHead>Date Created</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {data?.entries
            ?.sort((data1, data2) => data2.createdAt > data1.createdAt)
            .map((dataElement, index) => (
              <TableRow key={`${dataElement.id}-row`}>
                <TableCell>{index + 1}</TableCell>
                <div onClick={() => handleRowClick(dataElement.id)}>
                  <TableCell>{dataElement.name}</TableCell>
                </div>
                <TableCell>{dataElement.status}</TableCell>
                <TableCell>{dataElement.createdAt}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
