import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { DataPiece } from "../store/slices/serverdata";
import { CommentData, normalizeComments } from "../store/slices/comments";
import { AuthorData } from "../store/slices/author";
import "../styles/author.css";
import { useHistory } from "react-router-dom";
import { useAppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

interface DescribedCardProps {
  news: DataPiece | null | undefined;
  comments: CommentData[];
  author: AuthorData;
}

export const DescribedCard: React.FC<DescribedCardProps> = ({
  news,
  comments,
  author,
}) => {
  const dispatch = useAppDispatch();
  const normalizedComments: CommentData[][] = useSelector(
    (state: RootState) => state.comments.normalizedComments
  );
  const authors: AuthorData[] = useSelector(
    (state: RootState) => state.authors.authors
  );
  const history: ReturnType<typeof useHistory> = useHistory();
  const handleClick = useCallback(() => {
    history.push(`/profile/${author.id}`);
  }, [history, author.id]);

  const handleLink = useCallback(
    (id) => {
      history.push(`/profile/${id}`);
    },
    [history]
  );

  useEffect(() => {
    const root: CommentData | undefined = comments.find(
      (comment) => comment.parentId === news?.id
    );
    const roots: CommentData[] = [root!];
    dispatch(normalizeComments({ roots, comments }));
  }, [dispatch, comments, news]);
  return (
    <Card>
      <CardActionArea>
        <Box ml={"1em"}>
          <Typography
            variant="h5"
            color="textPrimary"
            component="h5"
            className="my-dear-author"
            onClick={handleClick}
          >
            {author.firstName} {author.lastName}
          </Typography>
        </Box>
        <CardMedia component="img" height="350" image={news?.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {news?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {news?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box ml={"1em"}>
          <Typography variant="body2" color="textSecondary" component="h6">
            {new Date(news!.datetime).toDateString()}
          </Typography>
        </Box>
      </CardActions>
      <Box m={"auto"}>
        {normalizedComments &&
          normalizedComments.map((batch, index) => {
            return (
              <React.Fragment key={index}>
                {batch[0] && (
                  <Box ml={`${index + 3}em`} className="comment-box">
                    <Box>
                      <small>
                        {new Date(batch[0]?.datetime).toDateString()}
                      </small>{" "}
                      <span onClick={() => handleLink(batch[0].authorId)}>
                        <p>
                          {authors[batch[0].authorId].firstName}
                          {authors[batch[0].authorId].lastName}
                        </p>
                      </span>
                    </Box>
                    <p>{batch[0]?.comment}</p>
                  </Box>
                )}
                {batch[1] && (
                  <Box ml={`${index + 3}em`} className="comment-box">
                    <Box>
                      <small>
                        {new Date(batch[1]?.datetime).toDateString()}
                      </small>{" "}
                      <span onClick={() => handleLink(batch[1].authorId)}>
                        <p>
                          {authors[batch[1].authorId].firstName}
                          {authors[batch[1].authorId].lastName}
                        </p>
                      </span>
                    </Box>
                    <p>{batch[1]?.comment}</p>
                  </Box>
                )}
                {batch[2] && (
                  <Box ml={`${index + 3}em`} className="comment-box">
                    <Box>
                      <small>
                        {new Date(batch[2]?.datetime).toDateString()}
                      </small>
                      <span onClick={() => handleLink(batch[2].authorId)}>
                        <p>
                          {authors[batch[2].authorId].firstName}
                          {authors[batch[2].authorId].lastName}
                        </p>
                      </span>
                    </Box>
                    <p>{batch[2]?.comment}</p>
                  </Box>
                )}
                {batch[3] && (
                  <Box ml={`${index + 3}em`} className="comment-box">
                    <Box>
                      <small>
                        {new Date(batch[3]?.datetime).toDateString()}
                      </small>
                      <span onClick={() => handleLink(batch[3].authorId)}>
                        <p>
                          {authors[batch[3].authorId].firstName}
                          {authors[batch[3].authorId].lastName}
                        </p>
                      </span>
                    </Box>

                    <p>{batch[3]?.comment}</p>
                  </Box>
                )}
              </React.Fragment>
            );
          })}
      </Box>
    </Card>
  );
};
