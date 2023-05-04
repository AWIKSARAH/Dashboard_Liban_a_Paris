import React from "react";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function tableHead(props) {
  return (
    <TableHead
      style={{ backgroundColor: "var(--primary)", width: "100%", color: "white" }}
    >
      <TableRow width="100%">
        {props.cell.map((cell, key) => {
          return (
            <TableCell align="left" id={key} sx={{ color: "white" }}>
              {cell}
            </TableCell>
          );
        })}
        <TableCell align="left" sx={{ color: "white" }}>
          Edit{" "}
        </TableCell>{" "}
        <TableCell align="left" sx={{ color: "white" }}>
          Delete{" "}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default tableHead;
