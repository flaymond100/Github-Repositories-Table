export interface RepoProps {
  match: {
    params: {
      id: string;
      owner: string;
    };
  };
}

export interface NodeNames {
  name: string;
}

export interface Repository {
  repository: {
    createdAt: string;
    isPrivate: boolean;
    name: string;
    languages: {
      nodes: NodeNames[];
    };
    forkCount: number;
    openGraphImageUrl: string;
    url: string;
    commitComments: {
      totalCount: number;
    };
    description: string;
    owner: {
      login: string;
      repositories: {
        totalCount: number;
      };
    };
    stargazerCount: number;
  };
}

export interface Variables {
  name: string;
  owner: string;
}

export interface RepositoryData {
  data: {
    repository: {
      createdAt: string;
      isPrivate: boolean;
      name: string;
      languages: {
        nodes: NodeNames[];
      };
      forkCount: number;
      openGraphImageUrl: string;
      url: string;
      commitComments: {
        totalCount: number;
      };
      description: string;
      owner: {
        login: string;
        repositories: {
          totalCount: number;
        };
      };
      stargazerCount: number;
    };
  };
}
