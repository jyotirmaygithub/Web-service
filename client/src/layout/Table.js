import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FrontAuthContext } from "../Context/Context";
import TableValues from "../components/tableData";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


export default function BasicTable() {
  const { documents } = FrontAuthContext();

  console.log("documents = ", documents);
  const { existingDocuments } = documents;

  return (
      <TableContainer className="max-w-max "  component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Mobile Number</StyledTableCell>
              <StyledTableCell>Options : Edit/Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {existingDocuments
              ? existingDocuments.map((data) => {
                  return <TableValues data={data} />;
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
