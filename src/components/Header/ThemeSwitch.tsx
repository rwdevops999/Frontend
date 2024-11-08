import { useEffect, useState } from "react";
import "./ThemeSwitch.css";

const datathemes = ["light", "dark"];

const ThemeSwitch = () => {
  const [isLight, setIsLight] = useState<boolean>(true);

  const handleChangeTheme = () => {
    let body = document.body;
    const bodytheme = body.getAttribute("data-theme");
    let index = 1 - datathemes.findIndex((theme) => theme === bodytheme);
    body.setAttribute("data-theme", datathemes[index]);
    localStorage.setItem("theme", datathemes[index]);
    setIsLight(index === 0);
  };

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme == null) {
      theme = "dark";
      localStorage.setItem("theme", theme);
    }

    let body = document.body;
    body.setAttribute("data-theme", theme);
    setIsLight(theme === "light");
  }, []);

  return (
    <>
      <input
        type="checkbox"
        id="checkboxInput"
        onChange={handleChangeTheme}
        checked={isLight}
      />
      <label htmlFor="checkboxInput" className="toggleSwitch">
        <div className="speaker">
          <img className="icon-26" src="/src/assets/sun.svg" />
        </div>

        <div className="mute-speaker">
          <img className="icon-26" src="/src/assets/moon.svg" />
        </div>
      </label>
    </>
  );

  {
    /* <div className="btn-container">
      <img
        className="icon-26 tooltip-test filter-sun"
        title="login"
        src="/src/assets/sun.svg"
      />
      <label className="switch btn-color-mode-switch">
        <input
          value="1"
          id="color_mode"
          name="color_mode"
          type="checkbox"
          checked={!isLight}
          onChange={handleChangeTheme}
        />
        <label
          className="btn-color-mode-switch-inner"
          data-off="Light"
          data-on="Dark"
          htmlFor="color_mode"
        ></label>
      </label>
      <img
        className="icon-26 tooltip-test filter-moon"
        title="login"
        src="/src/assets/moon.svg"
      />
    </div> */
  }
};

export default ThemeSwitch;
