# 技术栈

1. amis
2. react
3. vite
4. typescript
5. lodash-es
6. mobx
7. mobx-react
8. mobx-state-tree
9. react-router-dom 6.21.2
10. styled-components

# 开发指南

```bash
yarn install

# 启动项目，等编译结束后通过 http://127.0.0.1:8888/examples/pages/simple 访问。
yarn dev

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
      path: "*",
      Component: NotFound,
    },
  ];
};


浏览器打开：`http://localhost:8888/editor/1`，完成页面设置后，复制schema到`src/pages`新建以`const modules = import.meta.glob("/src/pages/**/$*.tsx") `规则结尾的文件，访问文件路径，即页面。

```




