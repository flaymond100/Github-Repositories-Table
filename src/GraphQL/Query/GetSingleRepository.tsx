import { gql } from "@apollo/client";

const GET_SINGLE_REPO = gql`
  query getRepo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      createdAt
      isPrivate
      name
      languages(first: 10) {
        nodes {
          name
        }
      }
      forkCount
      openGraphImageUrl
      url
      commitComments {
        totalCount
      }
      description
      owner {
        login
        repositories {
          totalCount
        }
      }
      stargazerCount
    }
  }
`;

export default GET_SINGLE_REPO;
