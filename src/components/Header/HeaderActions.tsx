import { Divider } from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import AuthStatus from "./AuthStatus";
import { HeaderActionButtons } from "../../data/data";
import HeaderActionButton from "./HeaderActionButton";
import { HeaderState } from "../../data/states";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const HeaderActions = ({
  isAuthenticated,
  count,
  header,
}: {
  isAuthenticated: boolean;
  count: number;
  header: HeaderState | undefined;
}) => {
  const { debug } = useDebugContext();

  log(debug, "Tutopedia.Header.Actions", "Setup");

  return (
    <div className="parent">
      <ThemeSwitch />
      &nbsp;
      <Divider orientation="vertical" flexItem />
      &nbsp;
      {HeaderActionButtons.map((action) => (
        <HeaderActionButton
          key={action.id}
          action={action}
          isAuthenticated={isAuthenticated}
          count={count + 1}
          bucket={
            header
              ? header.bucket
                ? header.bucket
                : "<<<undefined>>>"
              : "<<<undefined>>>"
          }
        />
      ))}
      <AuthStatus />
    </div>
  );
};

export default HeaderActions;
