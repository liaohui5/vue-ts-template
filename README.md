# 项目介绍

一个自用的模板项目, 用于快速搭建一个功能较为完善的 vue 项目,
不用每次都去安装配置一堆依赖包, 主要包含一些常用的配置比如 axios/tailwind/msw/vitest 等

![language](https://img.shields.io/badge/language-中文-blue)
![license](https://img.shields.io/badge/license-mit-green)
![vue](https://img.shields.io/badge/framework-vue-52A677)
![ui](https://img.shields.io/badge/ui-tailwindcss-59B3F2)
![http](https://img.shields.io/badge/http-axios-612ED5)
![validation](https://img.shields.io/badge/validation-zod-2C4474)
![vitest](https://img.shields.io/badge/test-vitest-F1C040)
![msw](https://img.shields.io/badge/mock-msw-ff6a33)
![typescript](https://img.shields.io/badge/language-typescript-blue)

## 项目结构

```txt
.
├── LICENSE
├── README.md
├── env.example
├── index.html
├── mockServiceWorker.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── Layout.vue
│   ├── __mocks__
│   │   ├── browser.ts
│   │   ├── handlers
│   │   │   └── auth.ts
│   │   ├── handlers.ts
│   │   └── node.ts
│   ├── __tests__
│   │   ├── helpers.ts
│   │   └── setupMSW.ts
│   ├── api
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   └── transformers
│   │       ├── __tests__
│   │       │   └── auth.spec.ts
│   │       └── auth.ts
│   ├── assets
│   ├── components
│   ├── hooks
│   │   ├── __tests__
│   │   │   └── useGoto.spec.ts
│   │   ├── index.ts
│   │   └── useGoto.ts
│   ├── main.ts
│   ├── plugins
│   │   ├── element-plus.ts
│   │   ├── index.ts
│   │   └── mock-service-worker.ts
│   ├── router
│   │   ├── __tests__
│   │   │   └── router.spec.ts
│   │   ├── guards.ts
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── store
│   │   ├── __tests__
│   │   │   └── auth.spec.ts
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── style.css
│   ├── tools
│   │   ├── algorithm.ts
│   │   ├── env-vars.ts
│   │   ├── http
│   │   │   ├── __tests__
│   │   │   │   ├── request.spec.ts
│   │   │   │   └── response.spec.ts
│   │   │   ├── axios.d.ts
│   │   │   ├── index.ts
│   │   │   └── interceptors
│   │   │       ├── request.ts
│   │   │       └── response.ts
│   │   ├── index.ts
│   │   ├── notify.ts
│   │   ├── progress.ts
│   │   └── token.ts
│   ├── types
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── validation
│   │   ├── index.ts
│   │   ├── rules
│   │   │   └── auth.ts
│   │   └── validate.ts
│   ├── views
│   │   ├── home
│   │   │   └── index.vue
│   │   └── login
│   │       └── index.vue
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

## 快速启动

```sh
git clone https://github.com/lh5template/vuejs-with-vitest ./demo
cd ./demo
pnpm install
npm run dev
# visit http://localhost:8080
```

## 修改 .env 文件

```sh
cp env.example .env
```

## MokServiceWorker

因为需要 `mockServiceWorker.js` 所以模拟服务端仅在开发模式下生效
如果要打包后运行, 请使用真实的 API 服务
