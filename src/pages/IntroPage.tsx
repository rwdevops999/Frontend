import { Box } from "@mui/material";
import { TUTOPEDIA_CONTENT_IMAGE_PAGE } from "../data/layout/layout";

const getRandomInt = (max: number) => {
  return Math.round(Math.random() * max) + 1;
};

const IntroPage = () => {
  const getImageSrc = () => {
    return "/src/assets/tutopedia" + getRandomInt(1) + ".jpeg";
  };

  return (
    <Box data-title={TUTOPEDIA_CONTENT_IMAGE_PAGE} sx={{ marginLeft: "24%" }}>
      <img src={getImageSrc()} width="800" height="735" />
    </Box>
  );
};

export default IntroPage;
