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
1、yarn install

2、yarn dev

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

# 渲染器

新增渲染器：table-crud（未集成页面设计器）, schema参考如下。

```bash

schema = {
  type: "page",
  body: {
    type: "table-crud",
    api: "$preset.apis.list",
    filter: "$preset.forms.filter",
    filterTogglable: true,
    perPageAvailable: [50, 100, 200],
    defaultParams: {
      size: 50,
    },
    perPageField: "size",
    pageField: "page",
    headerToolbar: [
      "filter-toggler",
      {
        type: "columns-toggler",
        align: "left",
      },
      {
        type: "pagination",
        align: "left",
      },
      "$preset.actions.add",
    ],
    footerToolbar: ["statistics", "switch-per-page", "pagination"],
    columns: [
      {
        name: "id",
        label: "ID",
        type: "text",
        width: 80,
      },
      {
        name: "desc",
        label: "描述",
        type: "text",
      },
      {
        name: "createTime",
        label: "创建时间",
        type: "datetime",
        width: 150,
      },
      {
        name: "updateTime",
        label: "更新时间",
        type: "datetime",
        width: 150,
      },
      {
        type: "operation",
        label: "操作",
        width: 60,
        buttons: ["$preset.actions.edit", "$preset.actions.del"],
      },
    ],
  },
  definitions: {
    updateControls: {
      controls: [
        {
          name: "desc",
          required: true,
          label: "配置描述",
          type: "text",
        },
        {
          name: 'content',
          label: 'JSON配置',
          type: 'json-editor',
        },
      ],
    },
  },
  preset: {
    apis: {
      list: {
        method: "get",
        url: "/api/table_crud/get",
      },
      add: {
        method: "post",
        url: "/api/table_crud/post",
      },
      edit: {
        method: "put",
        url: "/api/table_crud/put/$id",
      },
      del: {
        method: "delete",
        url: "/api/table_crud/delete/$id",
      },
    },
    actions: {
      add: {
        type: "button",
        align: "right",
        actionType: "dialog",
        label: "添加",
        icon: "fa-regular fa-square-plus",
        size: "sm",
        primary: true,
        dialog: {
          title: "新增配置",
          size: "lg",
          body: {
            type: "form",
            api: "$preset.apis.add",
            mode: "normal",
            $ref: "updateControls",
          },
        },
      },
      edit: {
        type: "button",
        icon: "fa-sharp fa-thin fa-calendar-pen",
        tooltip: "编辑配置",
        actionType: "dialog",
        dialog: {
          title: "编辑",
          size: "lg",
          body: {
            type: "form",
            mode: "normal",
            api: "$preset.apis.edit",
            $ref: "updateControls",
          },
        },
      },
      del: {
        type: "button",
        icon: "fa-sharp fa-solid fa-trash-can",
        actionType: "ajax",
        tooltip: "删除",
        confirmText: "您确认要删除?",
        api: "$preset.apis.del",
        messages: {
          success: "删除成功",
          failed: "删除失败",
        },
      },
    },
    forms: {
      filter: {
        controls: [
          {
            type: "date-range",
            name: "dateRange",
            label: "创建时间范围",
            format: "YYYY-MM-DD",
          },
          {
            type: "submit",
            className: "m-l",
            label: "搜索",
          },
        ],
      },
    },
  },
};

```




