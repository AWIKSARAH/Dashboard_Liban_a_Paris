import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Button,
  // Checkbox,
  Switch,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function TableBodyCom(props) {
  const rows = props.rows.map((cells) => ({ ...cells }));

  return (
    <TableBody>
      {rows.map((row, key) => (
        <TableRow
          key={row._id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            backgroundColor:
              key % 2 === 0 ? "var(--primary-derv)" : "var(--secondary)",
            color: key % 2 === 0 ? "var(--secondary)!important" : "black",
          }}
        >
          {props.columns.map((column, index) => (
            <TableCell
              key={index}
              component="th"
              scope="row"
              style={{
                color: "inherit!important",
                padding: typeof value === "boolean" && "0",
                textAlign: typeof value === "boolean" && "center",
              }}
            >
              { column.access === "confirmation" ? (
                <Switch
                  defaultChecked={row[column.access]}
                  onChange={(e) =>
                    props.handleConfirmationChange(e.target.checked, row._id)
                  }
                />
              ) : (
                row[column.access]
              )}
            </TableCell>
          ))}
          <TableCell>
            <Button onClick={() => props.handleEdit(row._id)}>
              {" "}
              <FontAwesomeIcon
                icon={faEdit}
                size="lg"
                style={{
                  "--fa-primary-color": "red",
                  "--fa-secondary-color": "#10c14e",
                }}
              />
            </Button>
            <Button>
              {" "}
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                style={{
                  "--fa-primary-color": "red",
                  "--fa-secondary-color": "#10c14e",
                }}
              />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TableBodyCom;
