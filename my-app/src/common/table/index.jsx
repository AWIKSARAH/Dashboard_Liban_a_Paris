import React from "react";
import { Box, Table, TableContainer, Pagination } from "@mui/material";
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
            {!props.isLoading && !props.error ? (
              <TableBody
                rows={props.rows}
                columns={props.columns}
                handleEdit={props.handleEdit}
                handleConfirmationChange={props.handleConfirmationChange}
              />
            ) : (
              <tfoot><tr>
                <td className="table--loading_wrapper">
                  {props.isLoading ? <Loader isLoading={true} /> : props.error}
                </td>
              </tr></tfoot>
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
