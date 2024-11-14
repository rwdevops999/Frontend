import "./SocialMedia.css";

import { SocialMediaData } from "../../data/data";
import SocialMediaItem from "./SocialMediaItem";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const SocialMedia = ({ update }: { update: boolean }) => {
  const { debug } = useDebugContext();

  log(debug && update, "Tutopedia.Footer.SocialMedia", "Setup");

  return (
    update && (
      <div className="card">
        <div className="social-media">
          {SocialMediaData.map((m) => (
            <SocialMediaItem key={m.name} media={m} />
          ))}
        </div>
      </div>
    )
  );
};

export default SocialMedia;
