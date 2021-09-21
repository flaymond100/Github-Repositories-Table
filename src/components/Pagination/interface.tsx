import React from "react";

export default interface PaginationProps {
  page: number;
  handlePage: (arg: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  totalRepos: number;
}
