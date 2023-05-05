import React from "react";
import {
  Box,
  Table,
  TableContainer,
  Pagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import { Loader } from "../../components/loader";

function TableContent(props) {

  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%" }}>
          <TableContainer
            component={Paper}
            sx={{ overflow: "auto", borderRadius: "0" }}
          >
            <Table sx={{ minWidth: "100%" }}>
              <TableHead columns={props.columns} />
              {!props.isLoading ? (
                <TableBody rows={props.rows} columns={props.columns} handleEdit={props.handleEdit} handleConfirmationChange={props.handleConfirmationChange}/>
              ) : (
                <tbody className="table--loading_wrapper">
                  <Loader isLoading={true} />
                </tbody>
              )}
            </Table>
          </TableContainer>
            <div className="gg">

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
