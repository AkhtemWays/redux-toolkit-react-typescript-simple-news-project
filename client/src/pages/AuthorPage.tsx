import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { AuthorData } from "../store/slices/author";
import "../styles/author.css";

type TParams = { id: string };

export const AuthorPage = ({ match }: RouteComponentProps<TParams>) => {
  const myDearAuthor: AuthorData = useSelector(
    (state: RootState) => state.author
  );
  // проверяю на нулл потому что есть айдишник нулевой :):)
  return !myDearAuthor.id === null ? (
    <div className="home-main">
      Sorry guys author is out leave him a message
    </div>
  ) : (
    <div className="home-main">
      This page is literally owned by {myDearAuthor.firstName}
      <span>{myDearAuthor.lastName}</span>
    </div>
  );
};
