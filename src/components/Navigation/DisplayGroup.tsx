import { ButtonGroup } from "@mui/material";
import DisplayButton from "./DisplayButton";

const DisplayGroup = ({
  count,
  views,
  selectedView,
}: {
  count: number;
  views: string[];
  selectedView: any;
}) => {
  return (
    <ButtonGroup>
      {views.map((view: string) => (
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

export default DisplayGroup;
