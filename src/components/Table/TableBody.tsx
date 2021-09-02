import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import { TableProps } from "./interface";

const TableBodyRender: React.FC<TableProps> = ({ rows, columns }) => {
  return (
    <TableBody>
      {rows.map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map((column, i) => {
              const value = row[column.id];
              const newPath = `/${row.owner}/${row.name}`;

              return (
                <TableCell align="center" key={row.id + column.id}>
                  {i === 0 ? <Link to={newPath}> {value} </Link> : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyRender;
