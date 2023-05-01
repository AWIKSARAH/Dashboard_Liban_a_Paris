import React, { useState } from "react";
import { Box, Table, TableContainer, TextField ,Button} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import { CSVLink } from "react-csv";
import PageHeader from "../../components/pageHeader";

function TableContent(props) {
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

  // const handleRowClick = (id) => {
  //   alert(id);
  // };
console.log(filteredRows);

  return (
    <Box sx={{ width: "100%" }}>
      <PageHeader label={props.title} />

      <TableContainer component={Paper} sx={{ overflow: "auto" ,borderRadius:"20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            margin="normal"
            style={{ marginRight: "50%" }}
          />
          <TableHead cell={props.cells} />

          <TableBody rows={filteredRows}></TableBody>
        </Table>
        <CSVLink data={rows} headers={props.cells} filename={`${props.title}.csv`}>
        <Button color="success" variant="contained">Export to CSV</Button>
      </CSVLink>
      </TableContainer>
    </Box>
  );
}

export default TableContent;
