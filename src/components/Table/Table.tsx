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
import TableBodyRender from "./TableBody";
import GET_ALL_REPOS from "../../GraphQL/Query/GetAllRepositories";
import useDebounce from "../../hooks/useDebounce";
import LoadingPage from "../Loading/Loading";
import SearchField from "./SearchField";
import { ItemsRow, Request, RepositoriesRender } from "./interface";

const TableBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const [getData, { loading, error, data }] = useLazyQuery<RepositoriesRender>(
    GET_ALL_REPOS,
    { fetchPolicy: "network-only" }
  );
  const [totalRepos, getTotalRepos] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState([] as Array<ItemsRow>);
  const debouncedValue = useDebounce<string>(searchTerm, 500);
  const [beforeQuery, setBeforeQuery] = useState<null | string | undefined>(
    null
  );
  const [afterQuery, setAfterQuery] = useState<null | string | undefined>(null);
  const [searchQuery, setSearchQuery] = useState<string>("is:public");

  const [translation] = useTranslation();

  const columns = [
    { id: "name", label: "Name", align: "center", minWidth: 140 },
    { id: "owner", label: "Owner", align: "center", minWidth: 100 },
    { id: "description", label: "Description", align: "center", minWidth: 300 },
    { id: "lang", label: "Lang", align: "center", minWidth: 170 },
    { id: "topics", label: "Topics", align: "center", minWidth: 170 },
    { id: "stars", label: "Stars", align: "center", minWidth: 170 },
  ];

  const queryRequest: Request = {
    variables: {
      searchBy: searchQuery,
      first: rowsPerPage,
      after: afterQuery,
      before: beforeQuery,
    },
  };
  const landReq = "table.row.";

  useEffect(() => {
    if (data) {
      handleTableInfo(data);
      getTotalRepos(data.search.repositoryCount);
    } else {
      getData(queryRequest);
      getTotalRepos(0);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getData(queryRequest);
      handleTableInfo(data);
    }
  }, [page, debouncedValue, rowsPerPage]);

  const handleTableInfo = (repositioriesData: RepositoriesRender) => {
    const rowsArr: Array<ItemsRow> = [];

    repositioriesData.search.edges.forEach((element) => {
      const incomeLanguage = element.node.languages.nodes;
      const incomeTopic = element.node.repositoryTopics.nodes;
      const languages: string[] = [];
      const topics: string[] = [];

      if (
        Object.keys(incomeLanguage).length > 1 &&
        Array.isArray(incomeLanguage)
      ) {
        incomeLanguage.forEach((lang) => {
          languages.push(lang.name);
        });
      }

      if (Object.keys(incomeTopic).length > 1 && Array.isArray(incomeTopic)) {
        incomeTopic.forEach((topic) => {
          topics.push(topic.topic.name);
        });
      }

      const row = {
        name: element.node.name,
        id: element.node.id,
        owner: element.node.owner.login,
        description: element.node.description ? element.node.description : "",
        lang: languages.join(", "),
        topics: topics ? topics.join(", ") : "",
        stars: element.node.stargazers.totalCount,
      };

      rowsArr.push(row);
    });

    setRows(rowsArr);
  };

  const handleSearch = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
    setSearchId(id);
    setSearchQuery(`${e.target.value} in:${id}`);

    if (!e.target.value) {
      setSearchTerm("");
      setSearchQuery("is:public");
    }
  };

  const setPageRows = (value: number) => setRowsPerPage(value);

  const handlePage = (value: number) => {
    setAfterQuery(data?.search.pageInfo.endCursor);
    setBeforeQuery(null);

    if (page > value) {
      setAfterQuery(null);
      setBeforeQuery(data?.search.pageInfo.endCursor);
    }

    setPage(value);
  };

  if (loading) return <LoadingPage />;

  if (error)
    return (
      <>
        <span>Error occurs, please reload the page</span>
      </>
    );

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
          <TableBodyRender rows={rows} columns={columns} />
        </Table>
      </TableContainer>
      <BasicPagination
        totalRepos={totalRepos}
        handlePage={handlePage}
        setRowsPerPage={setPageRows}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </Paper>
  );
};

export default TableBoard;
