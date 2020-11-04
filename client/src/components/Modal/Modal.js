import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    fontWeight: "700",
    color: "red",
  },
}));

const ModalComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);
  const productInfo = props.productInfo
    ? props.productInfo
    : { id: "", company: "", reason: "" };

  if (!open && props.open) {
    setOpen(props.open);
  }

  const handleClose = () => {
    setOpen(false);
    props.parentCallback();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{`Product Id ${productInfo.id} - ${productInfo.company}`}</h2>
          <p className={classes.text} id="transition-modal-description">
            {productInfo.reason}
          </p>
          <p>Products are eligible to return only if</p>
          <ul>
            <li> Purchased for less than 30 days</li>
            <li> Not on sale when purchased</li>
            <li> Is a returnable product</li>
          </ul>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
