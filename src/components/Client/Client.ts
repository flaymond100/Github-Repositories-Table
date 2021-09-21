import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL = "https://api.github.com/graphql";

const httpLink = createHttpLink({
  uri: URL,
});

const authLink = setContext(() => {
  const GitHubToken = process.env.REACT_APP_GITHUB_TOKEN;

  return {
    headers: {
      authorization: `Bearer ${GitHubToken}`,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
