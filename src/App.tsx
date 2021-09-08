import React, { FC, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Repo from "./components/RepositoryPage/RepositoryPage";
import TableBoard from "./components/Table/Table";
import Header from "./components/Header/Header";
import client from "./components/Client/Client";
import "./index.scss";

const App: FC = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Suspense fallback="loading">
          <Header />
          <Switch>
            <Route exact path="/" render={() => <TableBoard />} />
            <Route path="/:owner/:id" component={Repo} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </Suspense>
      </ApolloProvider>
    </Router>
  );
};

export default App;
