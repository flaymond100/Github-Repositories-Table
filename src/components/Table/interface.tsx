import React from "react";

export interface IColumsKey {
  [key: string]: string | number;
}

export interface ItemsRow extends IColumsKey {
  description: string;
  id: string;
  lang: string;
  name: string;
  owner: string;
  stars: number;
  topics: string;
}

export interface ItemsColumns {
  id: string;
}

export interface TableProps {
  rows: Array<ItemsRow> | [];
  columns: Array<ItemsColumns>;
}

export interface Request {
  variables: {
    searchBy: string;
    first: number;
    after: null | string | undefined;
    before: null | string | undefined;
  };
}

export interface Nodes {
  node: {
    name: string;
    id: string;
    description: string;
    owner: {
      login: string;
    };
    stargazers: {
      totalCount: number;
    };
    languages: {
      nodes: Array<{
        name: string;
      }>;
    };
    repositoryTopics: {
      nodes: Array<{
        topic: {
          name: string;
        };
      }>;
    };
  };
}

export interface RepositoriesRender {
  search: {
    pageInfo: {
      endCursor: string;
      startCursor: string;
    };
    repositoryCount: number;
    edges: Nodes[];
  };
}

export interface SearchFieldProps {
  handleSearch: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  id: string;
  searchId: string;
  searchTerm: string;
}
