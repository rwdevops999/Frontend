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
import {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { Tutorial } from "../../entities/Tutorial";
import BucketTransfer from "./BucketTransfer";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useConfiguration } from "../../configuration/UseConfiguration";

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
  setReload(val: any): void;
  bucketName: string;
}

const TutopediaDialog = (props: BucketDialogRawProps) => {
  const { debug } = useDebugContext();
  const [config] = useConfiguration();

  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const unpublish = useRef<Tutorial[]>([]);

  const setUnpublish = (tutorials: Tutorial[]) => {
    unpublish.current = tutorials;
  };

  const { onClose, open, bucketName, setReload, ...other } = props;

  log(
    debug,
    "TutoPediaDialog",
    `IN, bucket =  ${props.bucketName}, OPEN = ${open}`
  );

  const handleEntering = () => {};

  useEffect(() => {
    async function getBucketTutorials() {
      await axios
        .get(`/bucket/${bucketName}`)
        .then((response) => {
          if (response.data) {
            log(
              debug,
              "TutopediaDialog",
              "Tutorials loaded",
              response.data,
              true
            );
            log(
              debug,
              "TutopediaDialog",
              "LOADED FOR TRANSFER: " + response.data,
              true
            );
            setTutorials(response.data);
          }
        })
        .catch(function (error) {
          log(
            debug,
            "TutorialsListPage",
            "Error loading tutorials",
            error.message
          );
        });
    }

    if (props.bucketName) {
      getBucketTutorials();
    }
  }, []);

  const handleCancel = () => {
    onClose();
  };

  const unpublishTutorials = async (tutorials: Tutorial[]) => {
    log(debug, "TutopediaDialog", "Unpublishing Tutorials");

    if (config.environment !== "TST") {
      toast.loading("Unpublishing...");
    }

    await axios
      .put("/unpublish", tutorials)
      .then(() => {
        log(debug, "TutopediaDialog", "Trigger reload");
        setReload((x: any) => x + 1);
      })
      .catch(() => {
        log(debug, "TutopediaDialog", "Error unpublish");
        if (config.environment != "TST") {
          toast(`Error unpublishing tutorials`);
        }
      });
  };

  const handleOk = () => {
    log(debug, "TutopediaDialog", "OK: Unpublish", unpublish, true);

    onClose();

    if (unpublish.current.length > 0) {
      unpublishTutorials(unpublish.current);
    }
  };

  const PREFIX = "Dialog";
  const classes = {
    root: `${PREFIX}-root`,
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    content: `${PREFIX}-dialog-content`,
    actions: `${PREFIX}-dialog-actions`,
  };

  const RootDialog = styled(Dialog)(({}) => ({
    [`&.${classes.root}`]: {},
    [`& .${classes.content}`]: {},
    [`& .${classes.actions}`]: {
      justifyContent: "center",
    },
  }));

  function PaperComponent(props: PaperProps) {
    return <Paper {...props} />;
  }

  if (open) {
    return (
      <RootDialog
        fullWidth={false}
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        PaperComponent={PaperComponent}
        aria-labelledby="bucket-transfer-dialog"
        TransitionProps={{ onEntering: handleEntering }}
        {...other}
      >
        <DialogTitle className={classes.content}>
          {"Unpublish tutorials?"}
        </DialogTitle>

        <DialogContent className={classes.content}>
          <BucketTransfer tutorials={tutorials} setUnpublish={setUnpublish} />
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </RootDialog>
    );
  }

  return <></>;
};

export default TutopediaDialog;
