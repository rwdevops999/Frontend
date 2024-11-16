import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  PaperProps,
  Slide,
  styled,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref } from "react";
import { Tutorial } from "../entities/Tutorial";
import Draggable from "react-draggable";
import BucketTransfer from "./BucketTransfer";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface BucketDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
  tutorials: Tutorial[];
}

function TutopediaDialog(props: BucketDialogRawProps) {
  const { onClose, open, tutorials, ...other } = props;

  const handleEntering = () => {};

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    // onClose(value);
    onClose();
  };

  const PREFIX = "Dialog";
  const classes = {
    root: `${PREFIX}-root`,
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    content: `${PREFIX}-dialog-content`,
    actions: `${PREFIX}-dialog-actions`,
  };

  const RootDialog = styled(Dialog)(({ theme }) => ({
    [`&.${classes.root}`]: {},
    [`& .${classes.content}`]: {},
    [`& .${classes.actions}`]: {
      justifyContent: "center",
    },
  }));

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

  const handleNotify = (left: Tutorial[], right: Tutorial[]) => {
    console.log("NOTIFY");
  };

  return (
    <RootDialog
      open={open}
      TransitionComponent={Transition}
      PaperComponent={PaperComponent}
      aria-labelledby="bucket-transfer-dialog"
      TransitionProps={{ onEntering: handleEntering }}
      {...other}
    >
      <DialogTitle style={{ cursor: "move" }} className={classes.content}>
        {"Unpublish tutorials?"}
      </DialogTitle>

      <DialogContent className={classes.content}>
        <BucketTransfer tutorials={tutorials} onNotify={handleNotify} />
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </RootDialog>
  );
}

export default TutopediaDialog;
