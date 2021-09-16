import React, { FC, useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useLazyQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import BasicPagination from "../Pagination/Pagination";
import "../../index.scss";
import TableBodyUI from "./TableBodyUI";
import GET_ALL_REPOS from "../../GraphQL/Query/GetAllRepositories";
import useHandleSearch from "../../hooks/useHandleSearch";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import SearchField from "./SearchField";
import { ItemsRow, RepositoriesRender } from "./interface";
import handleTableInfo from "../../utils/HandleTableInfo";
import columns from "../../utils/Columns";

const TableBoard: FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { searchId, searchTerm, handleSearch, queryRequest } =
    useHandleSearch(rowsPerPage);
  const [getData, { loading, error, data }] = useLazyQuery<RepositoriesRender>(
    GET_ALL_REPOS,
    { fetchPolicy: "network-only" }
  );
  const [totalRepos, getTotalRepos] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState([] as Array<ItemsRow>);
  const debouncedValue = useDebounce<string>(searchTerm, 500);
  const [translation] = useTranslation();
  const landReq = "table.row.";

  useEffect(() => {
    getData({ variables: queryRequest });
  }, []);

  useEffect(() => {
    if (data) {
      setRows(handleTableInfo(data));
      getTotalRepos(data?.search.repositoryCount); // попробовать убрать
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getData({ variables: queryRequest });
      setRows(handleTableInfo(data));
    }
  }, [debouncedValue]);

  // const foo = (queryRequestFoo: any) => {
  //   if (data) {
  //     setRows(handleTableInfo(data));
  //     getTotalRepos(data?.search.repositoryCount);
  //   } else {
  //     getData({ variables: queryRequestFoo });
  //   }
  // };

  const handlePageRows = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const firstRows = parseInt(e.target.value, 10);
    const newQuery = {
      ...queryRequest,
      first: firstRows,
      after: null,
      before: null,
    };

    getData({ variables: newQuery });
    setRowsPerPage(firstRows);
    setPage(0);
  };

  const handlePage = (value: number) => {
    if (page > value) {
      getData({
        variables: {
          ...queryRequest,
          after: null,
          before: data?.search.pageInfo.endCursor,
        },
      });
    } else {
      getData({
        variables: {
          ...queryRequest,
          after: data?.search.pageInfo.endCursor,
          before: null,
        },
      });
    }

    setPage(value);
  };

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  <h1>{translation(landReq + column.id)}</h1>
                  <SearchField
                    searchTerm={searchTerm}
                    searchId={searchId}
                    handleSearch={handleSearch}
                    id={column.id}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBodyUI rows={rows} columns={columns} />
        </Table>
      </TableContainer>
      <BasicPagination
        totalRepos={totalRepos}
        handlePage={handlePage}
        setRowsPerPage={handlePageRows}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </Paper>
  );
};

export default TableBoard;
