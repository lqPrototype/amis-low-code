import { Suspense } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Loading } from "./loading";

export const Layout = () => {
  const pages = useLoaderData() as { path: string }[];

  const navigations = (pages || []).map((item: { path: string }) => ({
    label: item.path || "首页",
    route: item.path ? `/${item.path}` : "/",
  }));

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/*  可以改成Aside */}
      <ul>
        {navigations.map((menu: Record<string, any>) => (
          <li key={menu.route}>
            <Link to={menu.route}>{menu.label}</Link>
          </li>
        ))}
      </ul>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
