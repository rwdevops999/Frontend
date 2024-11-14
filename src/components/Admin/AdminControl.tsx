import AdminControlItem from "./AdminControlItem";
import "./AdminControl.css";
import { adminControl } from "../../data/admin/admindata";
import { useEffect, useState } from "react";
import {
  ROUTE_ADMIN,
  ROUTE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON,
} from "../../data/layout/layout";
import { buildState, buildTutopediaForAdmin } from "../../builders/Builders";
import { useLocation, useNavigate } from "react-router-dom";
import { TutopediaState } from "../../data/states";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";
import { useTutopediaState } from "../../hooks/states/useTutopediaState";

const AdminControl = ({ count }: { count: number }) => {
  const navigate = useNavigate();
  const { debug } = useDebugContext();
  const { state } = useLocation();

  log(debug, "AdminPage.Control", "Setup");

  const [checked, setChecked] = useState<string>("");

  useEffect(() => {
    adminControl.forEach((control) => {
      if (control.data.checked) {
        setChecked(control.id);
      }
    });
  }, []);

  useEffect(() => {
    if (checked === `${TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON}`) {
      handleControlChange(checked, false);
    }
  }, [checked, setChecked]);

  const { header } = useTutopediaState(state);

  const handleControlChange = (controlId: string, setValue: boolean = true) => {
    let tutopedia: TutopediaState | undefined = undefined;

    switch (controlId) {
      case TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS:
        log(debug, "AdminPage.Control", "Go To Admin Page...");
        tutopedia = buildTutopediaForAdmin(
          count,
          "Go To Settings",
          TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON,
          `/${ROUTE_ADMIN}`,
          header ? header.bucket : "<<<undefined>>>"
        );
        break;
      case TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS:
        log(debug, "AdminPage.Control", "Go To Buckets...");
        tutopedia = buildTutopediaForAdmin(
          count,
          "Go To Buckets",
          TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON,
          `${ROUTE_BUCKETS}`,
          header ? header.bucket : "<<<undefined>>>"
        );
    }

    if (tutopedia !== undefined) {
      if (setValue) {
        setChecked(controlId);
      }

      navigate(tutopedia.routeURL!, buildState(tutopedia));
    }
  };

  return (
    <div className="radio-inputs">
      {adminControl.map((control: any) => (
        <AdminControlItem
          key={control.id}
          control={control}
          checked={checked === control.id}
          handleControlChange={handleControlChange}
        />
      ))}
    </div>
  );
};

export default AdminControl;
