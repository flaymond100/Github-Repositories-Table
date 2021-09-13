import React, { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import { useTranslation } from "react-i18next";
import PaginationProps from "./interface";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const BasicPagination: FC<PaginationProps> = ({
  page,
  handlePage,
  rowsPerPage,
  setRowsPerPage,
  totalRepos,
}) => {
  const classes = useStyles();

  const [translation] = useTranslation();

  const rowsPerPageOptions = [10, 25, 100];

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pageNumber: number
  ) => {
    handlePage(pageNumber);
  };

  return (
    <div className={classes.root}>
      <TablePagination
        labelRowsPerPage={<p> {translation("labelRowsPerPage")} </p>}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalRepos}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default BasicPagination;
