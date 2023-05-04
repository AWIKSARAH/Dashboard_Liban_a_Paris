import React, { useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  TextField,
  Button,
  Pagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import { CSVLink } from "react-csv";
import PageHeader from "../../components/pageHeader";
import SearchBar from "../../components/searchBar";

function TableContent(props) {
  function createData(cells) {
    return { ...cells };
  }
  const rows = props.rows.map(createData);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const query = searchQuery.toLowerCase();
    props.setSearchQuery(query);
   
  };

  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  // const handleRowClick = (id) => {
  //   alert(id);
  // };

  const handleInputChange = (value) => {
    setSearchQuery(value);
  };
  console.log(filteredRows);
  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <PageHeader label={props.title} />

        <TableContainer
          component={Paper}
          sx={{ overflow: "auto", borderRadius: "20px" }}
        >
          <Table sx={{ minWidth: "100%" }}>
            <SearchBar onSearchClick={handleSearchChange} />

            <TableHead cell={props.cells} />

            <TableBody rows={filteredRows}></TableBody>
          </Table>
          <CSVLink
            data={rows}
            headers={props.cells}
            filename={`${props.title}.csv`}
          >
            <Button color="success" variant="contained">
              Export to CSV
            </Button>
          </CSVLink>
        </TableContainer>
        <Pagination
          shape="rounded"
          color="success"
          page={props.currentPage}
          count={props.pageCount || 1}
          showFirstButton
          showLastButton
          size="large"
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default TableContent;
