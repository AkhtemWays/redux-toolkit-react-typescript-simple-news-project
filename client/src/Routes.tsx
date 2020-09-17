import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthorPage } from "./pages/AuthorPage";
import { HomePage } from "./pages/Home";
import { Page404 } from "./pages/Page404";
import { NewsPage } from "./pages/SIngleNews";

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/new/:id" component={NewsPage} exact />
        <Route path="/profile/:id" component={AuthorPage} exact />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};
