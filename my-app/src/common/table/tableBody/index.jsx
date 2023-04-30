import React from "react";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function tableBody(props) {
  return (
    <TableHead style={{ backgroundColor: "#45893d" }} >
      <TableRow >
        {props.cell.map((cell, key) => {
          return (
            <TableCell align="center" id={key}>
              {cell}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default tableBody;
