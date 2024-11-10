import { NavigationPageNames } from "../../data/data";
import NavigationButton from "./NavigationButton";

const NavigationGroup = ({
  count,
  pages,
  selectedPage,
}: {
  count: number;
  selectedPage: any;
}) => {
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
