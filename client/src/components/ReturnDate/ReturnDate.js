import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import { UserContext } from "../../UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    paddingTop: "1vh",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  hide: {
    display: "hide",
  },
  text: {
    marginTop: "1vh",
    textAlign: "center",
  },
}));

const ReturnDate = () => {
  const classes = useStyles();
  const { value, showReturn, setShowReturn } = useContext(UserContext);
  let returnText;

  const handleDelete = () => {
    setShowReturn(false);
  };

  const chip =
    value.transactionId && showReturn ? (
      <div>
        <Chip
          label={`Last Return Date: ${value.lastReturnDate}`}
          onDelete={handleDelete}
          color="secondary"
          className={classes.chip}
        />
      </div>
    ) : null;

  if (value.transactionId) {
    returnText =
      value.returnableProds.length !== 0 ? (
        <h3 className={classes.text}>
          Transaction #{value.transactionId} Returnable Products
        </h3>
      ) : (
        <h3 className={classes.text}>
          Transaction #{value.transactionId} Has No Returnable Products
        </h3>
      );
  }

  return (
    <div className={classes.root}>
      {returnText}
      <br />
      {chip}
    </div>
  );
};

export default ReturnDate;
