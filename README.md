## 后台系统 PC 版

## Getting started

```bash
# clone the project
git clone 

# enter the project directory
cd background

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage


# 测试式服务器生产环境
npm run build:gray
# 正式服务器生产环境
# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
