import React, { FC, Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import client from "./components/Client/Client";
import "./index.scss";
import Loading from "./components/Loading/Loading";

const App: FC = () => {
  const RepositoryComponent = React.lazy(
    () => import("./components/RepositoryPage/RepositoryPage")
  );
  const TableBoardComponent = React.lazy(
    () => import("./components/Table/Table")
  );
  const NotFoundComponent = React.lazy(
    () => import("./components/404_NotFound/NotFound")
  );

  return (
    <Router>
      <ApolloProvider client={client}>
        <Suspense fallback={Loading}>
          <Header />
          <Switch>
            <Route exact path="/" component={TableBoardComponent} />
            <Route path="/:owner/:id" component={RepositoryComponent} />
            <Route component={NotFoundComponent} />
          </Switch>
        </Suspense>
      </ApolloProvider>
    </Router>
  );
};

export default App;
