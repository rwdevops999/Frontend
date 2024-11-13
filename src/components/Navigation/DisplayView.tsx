import { ButtonGroup } from "@mui/material";
import DisplayButton from "./DisplayButton";
import { NavigationViewNames } from "../../data/data";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const DisplayView = ({
  count,
  selectedView,
}: {
  count: number;
  selectedView: any;
}) => {
  const { debug } = useDebugContext();
  log(debug, "NavigationBar.View", "Setup");

  return (
    <ButtonGroup>
      {Object.values(NavigationViewNames).map((view: string) => (
        <DisplayButton
          key={view}
          count={count}
          view={view}
          selectedView={selectedView}
        />
      ))}
    </ButtonGroup>
  );
};

export default DisplayView;
