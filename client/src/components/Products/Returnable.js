import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core/";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Products = (props) => {
  const { value } = useContext(UserContext);
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {value.returnableProds &&
        value.returnableProds.map((product) => {
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
            </ListItem>
          );
        })}
    </List>
  );
};

export default Products;
