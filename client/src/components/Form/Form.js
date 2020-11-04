import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as api from "../../api/api";
import { UserContext } from "../../UserContext";
import styles from "./Form.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    marginTop: "2.5vh",
  },
  formItem: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "50vw",
    fontSize: "1.2rem",
  },
  textStyling: {
    fontSize: "1.2rem",
    fontWeight: "850",
    paddingTop: "1vh",
  },
  buttonStyling: {
    marginTop: "2vh",
    marginBottom: "0.5vh",
    width: "35vw",
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const [idInput, setIdInput] = useState({ id: "" });
  const { value, setValue, setShowReturn } = useContext(UserContext);

  function onChangeHandler(event) {
    setIdInput(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      api.sendId(idInput, props.getDate(), setValue, setShowReturn);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <h3 className={classes.textStyling}>
        Enter transaction id to check returnable product
      </h3>
      <form onSubmit={handleSubmit} className={classes.formItem}>
        <TextField
          id="outlined-search"
          label="Enter Transaction ID"
          type="number"
          variant="outlined"
          onChange={onChangeHandler}
          required
        />
        <p
          className={value.error ? styles.errorTextShow : styles.errorTextHide}
        >
          * {value.error}
        </p>
        <br />
        <Button
          className={classes.buttonStyling}
          variant="contained"
          color="primary"
          type="submit"
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          &nbsp; Submit
        </Button>
      </form>
      {value.returnableProds && <hr />}
    </div>
  );
};

export default Form;
