import React from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function TableBodyCom(props) {
  const rows = props.rows.map(createData);
  function createData(cells) {
    return { ...cells };
  }
  const handleRowClick = (id) => {
    alert(id);
  };

  return (
    <TableBody>
      {rows.map((row, key) => (
        <TableRow
          key={row._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          onClick={() => handleRowClick(row._id)}
          style={{
            backgroundColor:
              key % 2 === 0 ? "var(--primary-derv)" : "var(--secondary)",
          }}
        >
          {Object.values(row).map((value, index) => (
            <TableCell key={index} component="th" scope="row">
              {value}
            </TableCell>
          ))}
          <TableCell>
            <FontAwesomeIcon
              icon={faEdit}
              size="lg"
              style={{
                "--fa-primary-color": "red",
                "--fa-secondary-color": "#10c14e",
              }}
            />
          </TableCell>{" "}
          <TableCell>
            <FontAwesomeIcon
              icon={faTrash}
              size="lg"
              style={{
                "--fa-primary-color": "red",
                "--fa-secondary-color": "#10c14e",
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableBodyCom;
