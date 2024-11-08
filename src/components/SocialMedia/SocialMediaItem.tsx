import { SocialMedia } from "../../data/data";
import "./SocialMedia.css";

const SocialMediaItem = ({ media }: { media: SocialMedia }) => {
  return (
    <a key={media.id} href={media.url} className="submenu-link">
      <img
        src={`/src/assets/${media.name}.svg`}
        title={`${media.name}`}
        alt={media.name}
      />
    </a>
  );
};

export default SocialMediaItem;
