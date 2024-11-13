import { NavigationPageNames } from "../../data/data";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";
import NavigationButton from "./NavigationButton";

const NavigationGroup = ({
  count,
  selectedPage,
}: {
  count: number;
  selectedPage: any;
}) => {
  const { debug } = useDebugContext();
  log(debug, "NavigationBar.Group", "Setup");

  return Object.values(NavigationPageNames).map((page: string) => (
    <NavigationButton
      key={page}
      count={count}
      page={page}
      selectedPage={selectedPage}
    />
  ));
};

export default NavigationGroup;
