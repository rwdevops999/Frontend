import { ReactNode, useState } from "react";
import { Tutorial } from "../entities/Tutorial";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function valueNotInDestination(value: number, arr: Tutorial[]) {
  return arr.filter((tutorial) => tutorial.id !== value);
}

function valueInDestination(value: number, arr: Tutorial[]) {
  return arr.filter((tutorial) => tutorial.id === value);
}

function not(source: Tutorial[], destination: Tutorial[]) {
  let result: Tutorial[] = source;

  destination.map((value) => {
    result = [...valueNotInDestination(value.id!, result)];
  });

  return result;
}

function union(source: Tutorial[], destination: Tutorial[]) {
  return [...source, ...not(destination, source)];
}

function intersection(source: Tutorial[], destination: Tutorial[]) {
  let result: Tutorial[] = [];

  destination.map((value) => {
    result = [...result, ...valueInDestination(value.id!, source)];
  });

  return result;
}

const Test = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const PREFIX = "Test";
  const classes = {
    root: `${PREFIX}-root`,
    button: `${PREFIX}-button`,
    cardheader: `${PREFIX}-cardheader`,
    collapse: `${PREFIX}-collapse`,
    list: `${PREFIX}-list`,
  };

  const Root = styled("div")(({ theme }) => ({
    [`&.${classes.root}`]: {},
    [`& .${classes.button}`]: {
      margin: theme.spacing(0.5, 0),
    },
    [`& .${classes.cardheader}`]: {
      padding: theme.spacing(1, 2),
      boxShadow: "0px 4px 80px grey",
    },
    [`& .${classes.collapse}`]: {
      "& .MuiCollapse-wrapperInner": {
        display: "flex",
        flexDirection: "column",
      },
    },
    [`& .${classes.list}`]: {
      height: 230,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      marginTop: 4,
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
  const t6: Tutorial = {
    id: 6,
    title: "tutorial6",
    description: "description6",
    published: false,
    filename: "filename6",
  };
  const t7: Tutorial = {
    id: 7,
    title: "tutorial7",
    description: "description7",
    published: false,
    filename: "filename7",
  };

  const [checked, setChecked] = useState<Tutorial[]>([]);
  const [left, setLeft] = useState<Tutorial[]>([t0, t1, t2, t3]);
  const [right, setRight] = useState<Tutorial[]>([t4, t5, t6, t7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const numberOfChecked = (items: Tutorial[]) => {
    return intersection(checked, items).length;
  };

  const moveCheckedToRight = () => {
    handleSortClick(right.concat(leftChecked), "right");
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const moveCheckedToLeft = () => {
    handleSortClick(left.concat(rightChecked), "left");
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const swapItems = () => {
    setRight(left);
    setLeft(right);
  };

  const indexOfChecked = (v: string, tutorial: Tutorial): number => {
    let result: number = -1;
    checked.forEach((t: Tutorial, index: number) => {
      if (t.id === tutorial.id) {
        result = index;
      }
    });

    return result;
  };

  const handleToggle = (tutorial: Tutorial) => () => {
    const currentIndex = indexOfChecked("toggle", tutorial);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(tutorial);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (items: Tutorial[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleSortClick = (tutorials: Tutorial[], side: string) => {
    const copyItems = [...tutorials].sort((a, b) =>
      a.filename! > b.filename! ? 1 : -1
    );
    if (side === "right") {
      setRight(copyItems);
    } else {
      setLeft(copyItems);
    }
  };

  const CardSelector = (
    title: ReactNode,
    tutorials: Tutorial[],
    side: string
  ) => {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
      <>
        <Card
          style={{ display: "flex", flexDirection: "column" }}
          component={Paper}
        >
          <CardHeader
            className={classes.cardheader}
            avatar={
              <Checkbox
                onClick={handleToggleAll(tutorials)}
                checked={
                  numberOfChecked(tutorials) === tutorials.length &&
                  tutorials.length !== 0
                }
                indeterminate={
                  numberOfChecked(tutorials) !== tutorials.length &&
                  numberOfChecked(tutorials) !== 0
                }
                disabled={tutorials.length === 0}
                inputProps={{ "aria-label": "all items selected" }}
              />
            }
            title={title}
            subheader={`${numberOfChecked(tutorials)}/${
              tutorials.length
            } selected`}
            action={
              <IconButton
                aria-expanded={expanded}
                aria-label="show more"
                onClick={handleExpandClick}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          <Collapse in={expanded} className={classes.collapse}>
            <List className={classes.list} dense component="div" role="list">
              {tutorials.map((tutorial: Tutorial) => {
                const id = `${tutorial.id}-label`;
                return (
                  <ListItemButton
                    key={tutorial.id}
                    role="listItem"
                    onClick={handleToggle(tutorial)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={
                          indexOfChecked("test for checked", tutorial) !== -1
                        }
                      />
                    </ListItemIcon>
                    <ListItemText id={id} primary={`${tutorial.filename}`} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </Card>
      </>
    );
  };

  return (
    <Root className="{classes.root}">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Item>
          <Paper elevation={3}>{CardSelector("Bucket", left, "left")}</Paper>
        </Item>

        <Item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={moveCheckedToRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <SwipeRightIcon></SwipeRightIcon>
            </Button>

            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={moveCheckedToLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <SwipeLeftIcon></SwipeLeftIcon>
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={swapItems}
            >
              <SwapHorizIcon></SwapHorizIcon>
            </Button>
          </Grid>
        </Item>

        <Item>
          <Paper elevation={3}>
            {CardSelector("Tutorials", right, "right")}
          </Paper>
        </Item>
      </Grid>
    </Root>
  );
};

export default Test;
