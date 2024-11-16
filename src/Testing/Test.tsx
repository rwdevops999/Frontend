import Dialog from "@mui/material/Dialog";
import BucketTransfer from "./BucketTransfer";
import { forwardRef, Fragment, ReactElement, Ref, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
  Slide,
  styled,
} from "@mui/material";
import { Tutorial } from "../entities/Tutorial";
import Draggable from "react-draggable";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Test = () => {
  const [open, setOpen] = useState(false);

  const PREFIX = "Dialog";
  const classes = {
    root: `${PREFIX}-root`,
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    content: `${PREFIX}-dialog-content`,
    actions: `${PREFIX}-dialog-actions`,
  };

  const TutopediaDialog = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {},
    [`& .${classes.button}`]: {
      backgroundColor: "#FF0000",
    },
  }));

  const MyDialog = styled(Dialog)(({ theme }) => ({
    [`&.${classes.root}`]: {},
    [`& .${classes.content}`]: {
      backgroundColor: "#FF0000 !important",
    },
    [`& .${classes.actions}`]: {
      justifyContent: "center",
      backgroundColor: "#00FF00 !important",
    },
  }));

  const t0: Tutorial = {
    id: 0,
    title: "tutorial0",
    description: "description0",
    published: false,
    filename: "filename0",
  };
  const t1: Tutorial = {
    id: 1,
    title: "tutorial1",
    description: "description1",
    published: false,
    filename: "filename1",
  };
  const t2: Tutorial = {
    id: 2,
    title: "tutorial2",
    description: "description2",
    published: false,
    filename: "filename2",
  };
  const t3: Tutorial = {
    id: 3,
    title: "tutorial3",
    description: "description3",
    published: false,
    filename: "filename3",
  };
  const t4: Tutorial = {
    id: 4,
    title: "tutorial4",
    description: "description4",
    published: false,
    filename: "filename4",
  };
  const t5: Tutorial = {
    id: 5,
    title: "tutorial5",
    description: "description5",
    published: false,
    filename: "filename5",
  };

  function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const renderDialog = () => {
    return (
      <MyDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} className={classes.content}>
          {"Unpublish tutorials?"}
        </DialogTitle>

        <DialogContent className={classes.content}>
          <BucketTransfer tutorials={[t0, t1, t2, t3, t4, t5]} />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button autoFocus onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleCloseDialog}>Apply</Button>
        </DialogActions>
      </MyDialog>
    );
  };

  return (
    <>
      <TutopediaDialog id="topdialog1" className={classes.root}>
        <Button
          variant="outlined"
          onClick={handleOpenDialog}
          className={classes.button}
        >
          Bucket transfers ...
        </Button>
        {renderDialog()}
      </TutopediaDialog>
    </>
  );
};

export default Test;
