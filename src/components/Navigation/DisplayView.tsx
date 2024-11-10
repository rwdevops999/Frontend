import { ButtonGroup } from "@mui/material";
import DisplayButton from "./DisplayButton";
import { NavigationViewNames } from "../../data/data";

const DisplayView = ({
  count,
  selectedView,
}: {
  count: number;
  selectedView: any;
}) => {
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
