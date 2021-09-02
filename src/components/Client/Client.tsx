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
