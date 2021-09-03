import React, { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import { useTranslation } from "react-i18next";
import PagindationProps from "./interface";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const BasicPagination: FC<PagindationProps> = ({
  page,
  handlePage,
  rowsPerPage,
  setRowsPerPage,
  totalRepos,
}) => {
  const classes = useStyles();

  const [translation] = useTranslation();

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pageNumber: number
  ) => {
    handlePage(pageNumber);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    handlePage(0);
  };

  return (
    <div className={classes.root}>
      <TablePagination
        labelRowsPerPage={<p> {translation("labelRowsPerPage")} </p>}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRepos}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default BasicPagination;
