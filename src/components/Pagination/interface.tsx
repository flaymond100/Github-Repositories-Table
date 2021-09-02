export default interface PagindationProps {
  page: number;
  handlePage: (arg: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (arg: number) => void;
  totalRepos: number;
}
