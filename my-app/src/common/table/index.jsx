import React from "react";
import { Box, Table, TableContainer, Pagination, TableFooter } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
// import { CSVLink } from "react-csv";
import { Loader } from "../../components/loader";

function TableContent(props) {
  // const rows = props.rows.map((cells) => ({ ...cells }));


  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <TableContainer
          component={Paper}
          sx={{ overflow: "auto", borderRadius: "0" }}
        >
          <Table sx={{ minWidth: "100%" }}>
            <TableHead cell={props.columns} />
            {!props.isLoading?<TableBody rows={props.rows} />:<div className="table--loading_wrapper"><Loader isLoading={true} /></div>}
          </Table>
          {/* <CSVLink
            data={rows}
            headers={props.cells}
            filename={`${props.title}.csv`}
          >
            <Button color="success" variant="contained">
              Export to CSV
            </Button>
          </CSVLink> */}
        </TableContainer>
          <div className="gg" >

        <Pagination
          shape="rounded"
          page={props.currentPage}
          count={props.pageCount || 1}
          showFirstButton
          showLastButton
          size="large"
          onChange={handlePageChange}
          />
          </div>
        
      </Box>
    </Box>
  );
}

export default TableContent;
