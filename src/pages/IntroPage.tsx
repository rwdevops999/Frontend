import { Box } from "@mui/material";
import { TUTOPEDIA_CONTENT_IMAGE_PAGE } from "../data/layout/layout";

const IntroPage = () => {
  return (
    <Box data-title={TUTOPEDIA_CONTENT_IMAGE_PAGE} sx={{ marginLeft: "24%" }}>
      <img src="/src/assets/tutopedia.jpeg" width="800" height="735" />
    </Box>
  );
};

export default IntroPage;
