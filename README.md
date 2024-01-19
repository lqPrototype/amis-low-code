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





