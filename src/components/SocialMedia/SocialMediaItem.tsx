import { SocialMedia } from "../../data/data";
import useDebugContext from "../../hooks/useDebugContext";
import { log } from "../../utils/LogUtil";
import "./SocialMedia.css";

const SocialMediaItem = ({ media }: { media: SocialMedia }) => {
  const { debug } = useDebugContext();

  return (
    <a key={media.id} href={media.url} className="submenu-link">
      <img
        src={`/src/assets/${media.name}.svg`}
        title={`${media.name}`}
        alt={media.name}
        className="icon-24"
      />
    </a>
  );
};

export default SocialMediaItem;
