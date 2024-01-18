import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import { observer } from "mobx-react";
import "../renderer/TableCrudRenderer";
import NotFound from "./NotFound";
import PageEditor from "./editor";
import { set } from "lodash-es";
import AMISRenderer from "@/component/AMISRenderer";

/**
 *  扫描 src/pages 下的所有具有路由文件: 这里需要测试打包结果，在优化
 * @date 2024-01-18 星期四
 * @function
 * @param {}
 * @return {}
 */
const generatePathConfig = (): Record<string, any> => {
  const modules = import.meta.glob("/src/pages/**/$*.tsx");

  const pathConfig = {};
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      .replace("/src/pages/", "")
      .replace(/.tsx?/, "")
      .replace(/\$\[([\w-]+)]/, ":$1")
      .replace(/\$([\w-]+)/, "$1")
      // 以目录分隔
      .split("/");
    set(pathConfig, routePath, modules[filePath]);
  });

  return pathConfig;
};

const RootErrorBoundary = () => {
  let error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  );
};

/**
 * @author Pages递归
 * @date 2024-01-18 星期四
 * @function
 * @param {}
 * @return {}
 */
const mapPathConfigToRoute = (
  cfg: Record<string, any>
): Record<string, any>[] =>
  Object.entries(cfg).map(([routePath, child]) => {
    if (typeof child === "function") {
      const isIndex = routePath === "index";

      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        async lazy() {
          const { schema } = await child();

          return {
            Component: () => <AMISRenderer schema={schema}></AMISRenderer>,
          };
        },
      };
    }
    //目录
    const { $, ...rest } = child;

    return {
      path: routePath,
      async lazy() {
        if (!$) {
          return {
            Component: () => <div></div>,
          };
        }
        const { schema } = await $();
        return {
          Component: () => <AMISRenderer schema={schema}></AMISRenderer>,
        };
      },
      children: mapPathConfigToRoute(rest),
    };
  });

/**
 * @author 动态路由
 * @date 2024-01-18 星期四
 * @function
 * @param {}
 * @return {}
 */
const generateRouteConfig = (): Record<string, any>[] => {
  const { $, ...pathConfig } = generatePathConfig();

  return [
    {
      path: "/",
      errorElement: <RootErrorBoundary />,
      async lazy() {
        if (!$) {
          return {
            Component: () => <div></div>,
          };
        }
        const { schema } = await $();
        return {
          Component: () => <AMISRenderer schema={schema}></AMISRenderer>,
        };
      },
      children: mapPathConfigToRoute(pathConfig),
    },
    {
      path: "/editor/:id",
      Component: PageEditor,
    },
    {
      path: "/layout",
      async lazy() {
        const { Layout } = await import("./Layout");
        return {
          loader: () => mapPathConfigToRoute(pathConfig),
          Component: Layout,
        };
      },
    },
    {
      path: "*",
      Component: NotFound,
    },
  ];
};

/**
 * @date 2024-01-17 星期三
 * @function 约定路由 = 文件及路由
 * @param {}
 * @return {}
 */
const router = createBrowserRouter(generateRouteConfig());

export default observer(() => (
  <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
));
