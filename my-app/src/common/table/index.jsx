import React, { useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Head from "./tableHead";

function TableContent(props) {
  const cell = props.cells;

  function createData(cells) {
    return { ...cells };
  }

  const rows = props.rows.map(createData);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = rows.filter((row) =>
      Object.values(row).some(
        (value) => value && value.toString().toLowerCase().includes(query)
      )
    );
    setFilteredRows(filtered);
  };

  const handleRowClick = (id) => {
    alert(id);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
        style={{marginRight:'50%'}}
      />
          <Head cell={props.cells} />

          <TableBody >
            {filteredRows.map((row, key) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleRowClick(row._id)}
                style={{ backgroundColor: (key % 2) === 0 ? "red" : "green" }}

              >
                {Object.values(row).map((value, index) => (
                  <TableCell key={index} component="th" scope="row" >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


export default  TableContent;
