import { ActionNames } from "../../data/data";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";
import ActionButton from "./ActionButton";

const ActionGroup = ({
  count,
  selectedPage,
}: {
  count: number;
  selectedPage: string | undefined;
}) => {
  const { debug } = useDebugContext();

  log(debug, "NavigationBar.Action", "Setup");
  return Object.values(ActionNames).map((action) => (
    <ActionButton
      key={action}
      count={count}
      action={action}
      selectedPage={selectedPage}
    />
  ));
};

export default ActionGroup;
