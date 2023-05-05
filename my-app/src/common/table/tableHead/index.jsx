import React from "react";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "./tableHead.css"
function tableHead(props) {
  return (
    <TableHead
      style={{
        backgroundColor: "var(--primary)",
        width: "100%",
        color: "white",
      }}
    >
      <TableRow width="100%">
        {props.columns.map((column, key) => {
          return (
            <TableCell
            key={key}
              align="left"
              id={key}
              sx={{ color: "white"}}
            >
              {column.label}
            </TableCell>
          );
        })}

        <TableCell
          align="left"
          sx={{ color: "white" }}
        >
          Action{" "}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default tableHead;
