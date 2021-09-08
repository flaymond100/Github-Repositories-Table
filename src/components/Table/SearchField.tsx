import React, { FC } from "react";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SearchFieldProps } from "./interface";

const SearchField: FC<SearchFieldProps> = ({
  handleSearch,
  id,
  searchTerm,
  searchId,
}) => {
  const [translation] = useTranslation();

  if (id === "name" || id === "description") {
    return (
      <TextField
        size="small"
        id="outlined-search"
        defaultValue={searchId === id ? searchTerm : ""}
        label={translation("searchField")}
        type="search"
        variant="outlined"
        onChange={(e) => handleSearch(id, e)}
        style={{ width: "180px" }}
      />
    );
  }

  return <> </>;
};

export default SearchField;
