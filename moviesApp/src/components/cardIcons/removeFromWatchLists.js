import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchListsIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromWatchLists = (e) => {
    e.preventDefault();
    context.removeFromWatchLists(movie);
  };
  return (
    <IconButton
      aria-label="remove from watchlists"
      onClick={handleRemoveFromWatchLists}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};
export default RemoveFromWatchListsIcon;