import React, { useState, useEffect } from "react";
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
import useDebounce from "../../hooks/useDebounce";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import SearchField from "./SearchField";
import { ItemsRow, Request, RepositoriesRender } from "./interface";
import handleTableInfo from "./HandleTableInfo";
import columns from "./Columns";

const TableBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const [getData, { loading, error, data }] = useLazyQuery<RepositoriesRender>(
    GET_ALL_REPOS,
    { fetchPolicy: "network-only" }
  );
  const [totalRepos, getTotalRepos] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState([] as Array<ItemsRow>);
  const debouncedValue = useDebounce<string>(searchTerm, 500);
  const [translation] = useTranslation();
  const [queryRequest, setQueryRequest] = useState<Request>({
    variables: {
      searchBy: "is:public",
      first: 10,
      after: null,
      before: null,
    },
  });

  const landReq = "table.row.";

  useEffect(() => {
    if (data) {
      setRows(handleTableInfo(data));
      getTotalRepos(data.search.repositoryCount);
    } else {
      getData(queryRequest);
      getTotalRepos(0);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getData(queryRequest);
      setRows(handleTableInfo(data));
    }
  }, [page, debouncedValue, queryRequest.variables.first]);

  const handleSearch = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
    setSearchId(id);
    setQueryRequest({
      variables: {
        ...queryRequest.variables,
        searchBy: !e.target.value ? "is:public" : `${e.target.value} in:${id}`,
      },
    });

    if (!e.target.value) {
      setSearchTerm("");
    }
  };

  const setPageRows = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQueryRequest({
      variables: {
        ...queryRequest.variables,
        first: parseInt(e.target.value, 10),
        after: null,
        before: null,
      },
    });
    setPage(0);
  };
  const handlePage = (value: number) => {
    if (page > value) {
      setQueryRequest({
        variables: {
          ...queryRequest.variables,
          after: null,
          before: data?.search.pageInfo.endCursor,
        },
      });
    } else {
      setQueryRequest({
        variables: {
          ...queryRequest.variables,
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
        setRowsPerPage={setPageRows}
        rowsPerPage={queryRequest.variables.first}
        page={page}
      />
    </Paper>
  );
};

export default TableBoard;
