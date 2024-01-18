/**
 * @author 导出schema
 * @date 2024-01-18 星期四
 * @function
 * @param {}
 * @return {}
 */
export const schema = {
    type: "page",
    id: "u:4b02283a1659",
    body: [
      {
        type: "grid",
        columns: [],
        id: "u:6756642b621e",
      },
      {
        type: "crud",
        syncLocation: false,
        api: {
          method: "get",
          url: "http://www.baidu.com/api",
        },
        columns: [
          {
            name: "id",
            label: "pages.demo.$index",
            type: "text",
            id: "u:651d4acbfac6",
          },
          {
            name: "engine",
            label: "渲染引擎",
            type: "text",
            id: "u:790bf28c41df",
          },
          {
            type: "operation",
            label: "操作",
            buttons: [
              {
                label: "编辑",
                type: "button",
                actionType: "dialog",
                level: "link",
                editorSetting: {
                  behavior: "update",
                },
                dialog: {
                  title: "编辑",
                  body: {
                    type: "form",
                    api: "xxx/update",
                    body: [
                      {
                        name: "id",
                        label: "ID",
                        type: "input-text",
                      },
                      {
                        name: "engine",
                        label: "渲染引擎",
                        type: "input-text",
                      },
                    ],
                  },
                },
                id: "u:d90d1f45b0a5",
              },
              {
                label: "查看",
                type: "button",
                actionType: "dialog",
                level: "link",
                editorSetting: {
                  behavior: "view",
                },
                dialog: {
                  title: "查看详情",
                  body: {
                    type: "form",
                    api: "xxx/update",
                    body: [
                      {
                        name: "id",
                        label: "ID",
                        type: "static",
                      },
                      {
                        name: "engine",
                        label: "渲染引擎",
                        type: "static",
                      },
                    ],
                  },
                },
                id: "u:c8bf7cec91f3",
              },
              {
                type: "button",
                label: "删除",
                actionType: "ajax",
                level: "link",
                className: "text-danger",
                confirmText: "确定要删除？",
                api: {
                  method: "post",
                  url: "http://www.baidu.com/api",
                },
                editorSetting: {
                  behavior: "delete",
                },
                id: "u:4e7dc3cb78f2",
              },
            ],
            id: "u:deb91f327bf7",
          },
        ],
        bulkActions: [
          {
            type: "button",
            label: "批量编辑",
            actionType: "dialog",
            editorSetting: {
              behavior: "bulkUpdate",
            },
            dialog: {
              title: "批量编辑",
              size: "md",
              body: {
                type: "form",
                api: "/xxx/bacth-edit",
                body: [
                  {
                    label: "字段1",
                    text: "字段1",
                    type: "input-text",
                  },
                ],
              },
            },
            id: "u:ea06366225a2",
          },
          {
            type: "button",
            level: "danger",
            label: "批量删除",
            actionType: "ajax",
            confirmText: "确定要删除？",
            api: "/xxx/batch-delete",
            editorSetting: {
              behavior: "bulkDelete",
            },
            id: "u:0e4ea103d5b9",
          },
        ],
        itemActions: [],
        headerToolbar: [
          {
            label: "新增",
            type: "button",
            actionType: "dialog",
            level: "primary",
            editorSetting: {
              behavior: "create",
            },
            dialog: {
              title: "新增",
              body: {
                type: "form",
                api: {
                  method: "post",
                  url: "http://www.baidu.com/api",
                },
                body: [
                  {
                    type: "input-text",
                    name: "id",
                    label: "ID",
                  },
                  {
                    type: "input-text",
                    name: "engine",
                    label: "渲染引擎",
                  },
                ],
              },
            },
            id: "u:244eab2e8e86",
            onEvent: {
              click: {
                weight: 0,
                actions: [
                  {
                    ignoreError: false,
                    actionType: "ajax",
                    outputVar: "responseResult",
                    options: {},
                    api: {
                      url: "http://baidu.com/api/add",
                      method: "get",
                    },
                  },
                ],
              },
            },
          },
          "bulkActions",
        ],
        id: "u:630deac503c5",
      },
    ],
  };
  