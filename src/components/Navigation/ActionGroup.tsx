import { ActionNames } from "../../data/data";
import ActionButton from "./ActionButton";

const ActionGroup = ({
  count,
  selectedPage,
}: {
  count: number;
  selectedPage: string | undefined;
}) => {
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
