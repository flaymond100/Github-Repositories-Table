import { gql } from "@apollo/client";

const GET_ALL_REPOS = gql`
  query getUser(
    $searchBy: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    search(
      query: $searchBy
      first: $first
      after: $after
      before: $before
      type: REPOSITORY
    ) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
            id
            description
            owner {
              login
            }
            stargazers {
              totalCount
            }
            languages(first: 100) {
              nodes {
                name
              }
            }
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_ALL_REPOS;
