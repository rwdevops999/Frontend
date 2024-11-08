import NavigationButton from "./NavigationButton";

const NavigationGroup = ({
  count,
  pages,
  selectedPage,
}: {
  count: number;
  pages: string[];
  selectedPage: any;
}) => {
  return pages.map((page: string) => (
    <NavigationButton
      key={page}
      count={count}
      page={page}
      selectedPage={selectedPage}
    />
  ));
};

export default NavigationGroup;
