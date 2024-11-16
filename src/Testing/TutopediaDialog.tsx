import Dialog from "@mui/material/Dialog";
import {
  Button,
  createTheme,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Paper,
  PaperProps,
  Slide,
  styled,
  ThemeProvider,
} from "@mui/material";
import { forwardRef, ReactElement, Ref } from "react";
import Draggable from "react-draggable";
import BucketTransfer from "./BucketTransfer";
import { TransitionProps } from "@mui/material/transitions";
import "./Test.css";
import { Tutorial } from "../entities/Tutorial";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TutopediaDialog = ({
  open,
  handleCloseDialog,
  tutorials,
}: {
  open: boolean;
  handleCloseDialog(): void;
  tutorials: Tutorial[];
}) => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        dark: "#000000",
        light: "#FFFFFF",
        contrastText: "white",
      },
    },
  });

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
    [`& .${classes.content}`]: {
      // backgroundColor: theme.palette.primary.dark,
    },
    [`& .${classes.actions}`]: {
      justifyContent: "center",
      // backgroundColor: "#00FF00 !important",
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

  return (
    // <ThemeProvider theme={customTheme}>
    <RootDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <>
        <DialogTitle style={{ cursor: "move" }} className={classes.content}>
          {"Unpublish tutorials?"}
        </DialogTitle>

        <DialogContent className={classes.content}>
          <BucketTransfer tutorials={tutorials} />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Apply</Button>
        </DialogActions>
      </>
    </Dialog>
    // </ThemeProvider>
  );
};

export default TutopediaDialog;
