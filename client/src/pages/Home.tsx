import React, { useEffect } from "react";
import "../styles/home.css";
import { MyCard } from "../components/MyCard";
import { RootState, useAppDispatch } from "../store/store";
import { getData } from "../utils/getData";
import { useSelector } from "react-redux";
import { DataPiece, paginate } from "../store/slices/serverdata";
import { Box, Button, Typography } from "@material-ui/core";
import { getAllAuthors } from "../utils/getAuthor";
interface HomeProps {}

export const HomePage: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const paginatedData: DataPiece[] = useSelector(
    (state: RootState) => state.news.paginatedData
  );

  const data: DataPiece[] = useSelector((state: RootState) => state.news.data);
  const errors: string = useSelector((state: RootState) => state.news.errors);
  const loading: boolean = useSelector(
    (state: RootState) => state.news.loading
  );
  useEffect(() => {
    dispatch(getData("http://localhost:5000/api/news"));
    dispatch(getAllAuthors("http://localhost:5000/api/users"));
  }, [dispatch]);
  return (
    <div className="home-main">
      {loading ? (
        <div>Loading...</div>
      ) : paginatedData ? (
        <>
          <div className="home-main__grid">
            {paginatedData.map((piece) => (
              <MyCard piece={piece} key={piece.id} />
            ))}
          </div>
          <Box
            mt="2em"
            border={data.length !== paginatedData.length ? `solid blue` : null}
          >
            {data.length !== paginatedData.length ? (
              <Button
                size="small"
                color="primary"
                onClick={() => dispatch(paginate())}
              >
                Load more
              </Button>
            ) : (
              <Typography gutterBottom variant="h5" component="h2">
                No data left!
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <div>error: {errors}</div>
      )}
    </div>
  );
};
