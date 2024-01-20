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

```


路由系统，参考 next.js 规则， $index 会自动解析为 react-router-dom， index： true.

```typescript


├── pages
│   │   ├── $.tsx
│   │   ├── $index.tsx
│   │   └── demo
│   │       ├── $.tsx
│   │       ├── $index.tsx
│   │       └── demo-child
│   │           ├── $.tsx
│   │           ├── $[name].tsx
│   │           └── $index.tsx


```

浏览器打开：`http://localhost:8888/editor/1`，完成页面设置后，复制schema到`src/pages`新建以`const modules = import.meta.glob("/src/pages/**/$*.tsx") `规则结尾的文件，访问文件路径，即页面。

## 注意知识点

1.  数据域形成的数据链组件，如何实现按照某个字段按需加载，提升性能优化？ 参考：`trackExpression` 配置成 `"${xxxVariable},${xxwww}"`

2. 不在数据域和数据链中的值，全局数据怎么取值？参考： `${window:document.title}`

3. 如何让某层组件具有数据域?  参考： 1. 配置组件初始化接口： initApi。2. 那些不支持配置初始化接口的组件来说，一般会使用 [**Service 组件**](https://baidu.github.io/amis/zh-CN/components/service) 来辅助实现数据域初始化。3. 显式配置 data 属性值。

4. 单个渲染器组件内部之间联动?  参考： 1. static-tpl 2. Formula


## 探索

1. 不同渲染器之间联动，如何实现通信的（比如触发目标组件的刷新操作）[❎]
2. 如何扩展新的表达式，`公式`和`函数调用`？[❎]
3. 如何创建自定义渲染器？[❎]
4. 如何创建初始化自定义渲染器？[❎]
5. 如何创建数据域渲染器？[❎]
6. 自定义渲染器组件如何注册到页面设计器？[❎]
7. 如何注册全局， Definitions？[❎]


