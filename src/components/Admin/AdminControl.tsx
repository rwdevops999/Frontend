import AdminControlItem from "./AdminControlItem";
import "./AdminControl.css";
import { adminControl } from "../../data/admin/admindata";
import { useEffect, useState } from "react";
import {
  ROUTE_ADMIN,
  ROUTE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS,
  TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON,
} from "../../data/layout/layout";
import { buildState, buildTutopediaForAdmin } from "../../builders/Builders";
import { useNavigate } from "react-router-dom";
import { TutopediaState } from "../../data/states";

const AdminControl = ({ count }: { count: number }) => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState<string>("");

  useEffect(() => {
    adminControl.forEach((control) => {
      if (control.data.checked) {
        setChecked(control.id);
      }
    });
  }, []);

  const handleControlChange = (controlId: string) => {
    console.log(
      `[${TUTOPEDIA_CONTENT_ADMIN_PAGE}] HANDLE PAGE CHANGE: ${controlId}`
    );

    let tutopedia: TutopediaState | undefined = undefined;

    switch (controlId) {
      case TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS:
        console.log(`[${TUTOPEDIA_CONTENT_ADMIN_PAGE}] DISPLAY SETTINGS`);
        tutopedia = buildTutopediaForAdmin(
          count,
          "Go To Settings",
          TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON,
          `/${ROUTE_ADMIN}`
        );
        break;
      case TUTOPEDIA_CONTENT_ADMIN_PAGE_BUCKETS:
        console.log(`[${TUTOPEDIA_CONTENT_ADMIN_PAGE}] DISPLAY BUCKETS`);
        tutopedia = buildTutopediaForAdmin(
          count,
          "Go To Buckets",
          TUTOPEDIA_CONTENT_ADMIN_PAGE_SETTINGS_BUTTON,
          `${ROUTE_BUCKETS}`
        );
    }

    console.log(`[${TUTOPEDIA_CONTENT_ADMIN_PAGE}] NAVIGATE ? : ${tutopedia}`);
    if (tutopedia !== undefined) {
      console.log(
        `[${TUTOPEDIA_CONTENT_ADMIN_PAGE}] NAVIGATE TO: ${tutopedia.routeURL}`
      );

      setChecked(controlId);
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
