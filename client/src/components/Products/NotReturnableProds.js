import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@material-ui/core/";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ModalComponent from "../Modal/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    position: "relative",
    marginTop: "1vh",
    textAlign: "center",
    width: "80%",
    left: "10%",
    paddingTop: "1.5vh",
  },
  buttonStyle: {
    fontSize: "0.75rem",
    width: "38%",
    maxWidth: 200,
  },
}));

const NotReturnable = (props) => {
  const { value } = useContext(UserContext);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [prod, setProd] = useState({});
  let headerText;

  if (value.transactionId) {
    const checker = value.notReturnableProds.length !== 0;
    headerText = checker && (
      <div>
        <hr />
        <h3 className={classes.text}>
          Other Products In Transaction #{value.transactionId}
        </h3>
      </div>
    );
  }

  function modalOpening(prod) {
    setOpenModal(true);
    setProd(prod);
  }

  function callback() {
    setOpenModal(false);
  }

  return (
    <div className={classes.root}>
      <List>
        {headerText}
        {value.notReturnableProds &&
          value.notReturnableProds.map((product) => {
            return (
              <ListItem key={product.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ShoppingCartIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={"Product Id " + product.id}
                  secondary={"Brand: " + product.company}
                />
                <Button
                  onClick={() => modalOpening(product)}
                  variant="outlined"
                  className={classes.buttonStyle}
                >
                  Why Not Returnable ?
                </Button>
              </ListItem>
            );
          })}
      </List>
      <ModalComponent
        productInfo={prod}
        open={openModal}
        parentCallback={callback}
      />
    </div>
  );
};

export default NotReturnable;
