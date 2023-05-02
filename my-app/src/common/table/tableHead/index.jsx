import React from "react";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function tableHead(props) {
  return (
    <TableHead style={{ backgroundColor: "#45893d" , width:'100%'}}>
      <TableRow width='100%'>
        {props.cell.map((cell, key) => {
          return (
            <TableCell align="left" id={key}>
              {cell}
            </TableCell>
          );
        })}
             <TableCell align="left" >
Action            </TableCell> 
      </TableRow>
    </TableHead>
  );
}

export default tableHead;
