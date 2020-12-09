<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.7.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/releases">
    <img src="https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg" alt="GitHub release">
  </a>
  <a href="https://gitter.im/vue-element-admin/discuss">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a>
  <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>
</p>

日本語 | [English](./README.md) | [简体中文](./README.zh-CN.md) | [Spanish](./README.es.md)


```
- ログイン / ログアウト

- Auth認証
  - ページ権限
  - 権限パーミッション
  - 権限設定
  - 外部IDでログイン

- 複数環境デプロイ
  - dev sit stage prod

- 共通機能
  - 多言語切替
  - テーマ切替
  - サイトメニュー（ルートから生成）
  - パンくずリストナビゲーション
  - タブナビゲーション
  - Svg Sprite アイコン
  - ローカル/バックエンド モック データ
  - Screenfull

- WYSIWYG
  - TinyMCE
  - Markdown
  - JSON

- Excel
  - エクスポート
  - インポート
  - リード
  - Zip

- テーブル
  - ダイナミックテーブル
  - ドラッグアンドドロップテーブル
  - インラインエディットテーブル

- エラーページ
  - 401
  - 404

- コンポーネント
  - アバターアップロード
  - トップに戻る
  - ドラッグダイアログ
  - ドラッグ選択
  - ドラッグKanban
  - ドラッグリスト
  - ペインの分割
  - Dropzone
  - スティッキー
  - CountTo

- 高度なサンプル
- エラーログ
- ダッシュボード
- ガイドページ
- ECharts
- クリップボード
- Markdown to html
```

## Getting started

```bash
# clone the project
git clone https://github.com/return-stay/background-system.git

# enter the project directory
cd background-system

# install dependency
npm install

# develop
npm run dev
```

http://localhost:9527 が自動的に開きます。

## Build

```bash
# build for test environment
npm run build:stage

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

