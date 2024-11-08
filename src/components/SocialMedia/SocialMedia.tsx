import "./SocialMedia.css";

import { SocialMediaData } from "../../data/data";
import SocialMediaItem from "./SocialMediaItem";

const SocialMedia = () => {
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
