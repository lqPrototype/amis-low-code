import App from "./App";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/v4-shims.css";
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
import "amis-editor-core/lib/style.css";
import "./scss/style.scss";
import { setDefaultTheme } from "amis";
import { setThemeConfig } from "amis-editor-core";
import themeConfig from "amis-theme-editor-helper/lib/systemTheme/cxd";
import { createRoot } from "react-dom/client";

setDefaultTheme("cxd");
setThemeConfig(themeConfig);

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
