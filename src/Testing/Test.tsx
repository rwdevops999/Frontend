import Dialog from "@mui/material/Dialog";
import BucketTransfer from "./BucketTransfer";
import { forwardRef, ReactElement, Ref, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  PaperProps,
  Slide,
  styled,
} from "@mui/material";
import { Tutorial } from "../entities/Tutorial";
import Draggable from "react-draggable";
import TutopediaDialog from "./TutopediaDialog";

const Test = () => {
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

  const tutorials = [t0, t1, t2, t3, t4, t5];

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Button onClick={handleOpen}>Open Bucket Transfer Dialog</Button>
      <TutopediaDialog
        id="bucket-transfer"
        keepMounted
        open={open}
        onClose={handleClose}
        tutorials={tutorials}
      />
    </Box>
  );
};

export default Test;
