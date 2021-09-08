import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext(() => {
  const GitHubToken = "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";

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
