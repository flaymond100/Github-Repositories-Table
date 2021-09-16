import React, { useState } from "react";
import { Request, HandleSearchInterface } from "../components/Table/interface";

const useHandleSearch = (rowsPerPage: number): HandleSearchInterface => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const [queryRequest, setQueryRequest] = useState<Request>({
    searchBy: "is:public",
    first: rowsPerPage,
    after: null,
    before: null,
  });

  const handleSearch = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);

    if (id !== "lang" && id !== "topic") {
      setQueryRequest({
        ...queryRequest,
        searchBy: e.target.value ? `${e.target.value} in:${id}` : "is:public",
        first: rowsPerPage,
      });
    } else {
      setQueryRequest({
        ...queryRequest,
        searchBy: e.target.value ? `${id}:${e.target.value}` : "is:public",
        first: rowsPerPage,
      });
    }

    if (!e.target.value) {
      setSearchTerm("");
    }

    setSearchId(id);
  };

  return {
    searchTerm,
    searchId,
    handleSearch,
    queryRequest,
  };
};

export default useHandleSearch;
