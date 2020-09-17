import {
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { DataPiece } from "../store/slices/serverdata";
import { useHistory } from "react-router-dom";

interface MyCardProps {
  piece: DataPiece;
}

export const MyCard: React.FC<MyCardProps> = ({ piece }) => {
  const history: ReturnType<typeof useHistory> = useHistory();
  const handleClick = useCallback(() => {
    history.push(`/new/${piece.id}`);
  }, [history, piece.id]);
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={piece.image}
        style={{ cursor: "default" }}
      />
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            {piece.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea>
        <Box ml={"1em"} mb={"0.25em"}>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            style={{ cursor: "default" }}
          >
            {new Date(piece.datetime).toDateString()}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
