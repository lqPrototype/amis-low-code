import { Link } from "react-router-dom";
import { NotFound } from "amis";

export default () => (
  <NotFound
    links={<Link to="/">去首页</Link>}
    footerText={"你可以在Pages目录下面新建文件"}
  />
);
