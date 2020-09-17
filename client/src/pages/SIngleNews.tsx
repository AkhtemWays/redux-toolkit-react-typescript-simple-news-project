import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { getCommentsData } from "../utils/getComments";
import { getAuthor } from "../utils/getAuthor";
import { AuthorData } from "../store/slices/author";
import { CommentData } from "../store/slices/comments";
import "../styles/news.css";
import { DescribedCard } from "../components/DescribedCard";

import { DataPiece } from "../store/slices/serverdata";

type TParams = { id: string };

export const NewsPage = ({ match }: RouteComponentProps<TParams>) => {
  const [currentNews, setCurrentNews] = useState<DataPiece | null | undefined>(
    null
  );
  const dispatch = useAppDispatch();
  const author: AuthorData = useSelector((state: RootState) => state.author);
  const data: DataPiece[] = useSelector((state: RootState) => state.news.data);
  const comments: CommentData[] = useSelector(
    (state: RootState) => state.comments.data
  );
  const errors: string = useSelector(
    (state: RootState) => state.comments.errors
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.comments.loading
  );

  useEffect(() => {
    dispatch(
      getCommentsData(`http://localhost:5000/api/comments/${match.params.id}`)
    );
    const news: DataPiece | undefined = data.find(
      (piece) => piece.id === Number.parseInt(match.params.id)
    );
    setCurrentNews(news);
    console.log(news?.authorId);
    dispatch(getAuthor(`http://localhost:5000/api/user/${news?.authorId}`));
  }, [dispatch, match.params.id, data]);
  return (
    <div className="news-main">
      {comments && currentNews && author ? (
        <div style={{ width: "85%" }}>
          <DescribedCard
            comments={comments}
            news={currentNews}
            author={author}
          />
        </div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          We are very very very sorry. God sees how sorry we are, but error
          occured: {errors}
        </div>
      )}
    </div>
  );
};
