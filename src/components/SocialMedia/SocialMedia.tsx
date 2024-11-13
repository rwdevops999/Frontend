import "./SocialMedia.css";

import { SocialMediaData } from "../../data/data";
import SocialMediaItem from "./SocialMediaItem";
import { log } from "../../utils/LogUtil";
import useDebugContext from "../../hooks/useDebugContext";

const SocialMedia = () => {
  const { debug } = useDebugContext();

  log(debug, "Tutopedia.Footer.SocialMedia", "Setup");

  return (
    <div className="card">
      <div className="social-media">
        {SocialMediaData.map((m) => (
          <SocialMediaItem key={m.name} media={m} />
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
