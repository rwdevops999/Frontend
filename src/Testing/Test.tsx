import { Box } from "@mui/material";
import "./Test.css";

const Test = () => {
  return (
    <Box id="XXX" width={"100%"} height={"20%"}>
      <div className="radio-inputs">
        <label>
          <input className="radio-input" type="radio" name="engine" />
          <span className="radio-tile">
            <span className="radio-icon">
              <img className="icon-26" src={`/src/assets/admingear.svg`} />
            </span>
            <span className="radio-label">Settings</span>
          </span>
        </label>

        <label>
          <input checked className="radio-input" type="radio" name="engine" />
          <span className="radio-tile">
            <span className="radio-icon">
              <img className="icon-26" src={`/src/assets/adminbucket.svg`} />
            </span>
            <span className="radio-label">Buckets</span>
          </span>
        </label>
      </div>
    </Box>
  );
};

export default Test;
