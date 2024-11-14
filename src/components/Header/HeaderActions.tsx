import { Divider } from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import AuthStatus from "./AuthStatus";
import { HeaderActionButtons } from "../../data/data";
import HeaderActionButton from "./HeaderActionButton";

const HeaderActions = ({
  isAuthenticated,
  count,
}: {
  isAuthenticated: boolean;
  count: number;
}) => {
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
        />
      ))}
      <AuthStatus />
    </div>
  );
};

export default HeaderActions;
