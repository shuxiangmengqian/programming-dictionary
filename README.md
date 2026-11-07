# 📖 编程词典 (Programming Dictionary)

一个专为零基础程序员打造的微信小程序，解决初学者看不懂英文代码和报错的痛点。收录 HTML / CSS / JavaScript / Python / Java 五大语言共 200+ 高频编程词汇，每个词附中文释义、通俗解释和可直接复制的代码示例。

> 微信搜索「编程词典」即可体验，或使用微信开发者工具导入本项目运行。

## 📸 项目截图

| 词典首页 | 分类筛选 | 代码速查 | 我的学习 |
| --- | --- | --- | --- |
| _待添加_ | _待添加_ | _待添加_ | _待添加_ |

## ✨ 核心功能

- **多语言分类检索**：按 HTML / CSS / JavaScript / Java / Python 标签筛选词汇
- **模糊搜索**：输入中文或英文关键词，实时匹配单词、释义、解释
- **代码示例一键复制**：每个单词附带真实代码片段，点一下就能复制
- **每日一词**：首页随机推荐一个词汇，利用碎片时间积累
- **代码速查库**：内置高频代码片段（居中、防抖、深拷贝、云数据库查询等）
- **掌握标记**：标记"已攻克"后，个人中心学习进度条实时更新
- **暗黑模式**：全局极客风深色主题，夜间学习保护视力
- **分享海报**：自动生成学习进度分享图
- **离线兜底**：云数据库不可用时自动降级为本地示例数据，保证可演示

## 🛠️ 技术栈

| 层 | 技术 |
| --- | --- |
| 前端 | 微信小程序原生开发（WXML / WXSS / JavaScript） |
| 后端 | 微信云开发（云数据库 NoSQL） |
| 架构 | 单端小程序 + 云数据库直连，无自建服务器 |
| 核心机制 | Promise 并发分页、`db.RegExp` 模糊查询、`db.command.in` 多值筛选、离线降级兜底 |

## 💼 简历项目描述（可直接复制）

> **独立开发微信小程序「编程词典」** | 2026
> - 面向零基础程序员的编程词汇学习工具，收录 HTML/CSS/JavaScript/Python/Java 五大语言 200+ 高频词汇，每个词附中文释义、通俗解释和可复制代码示例
> - 基于微信小程序原生框架（WXML/WXSS/JS）+ 微信云开发（NoSQL 云数据库），无自建服务器
> - 实现多语言分类筛选、`db.RegExp` 模糊搜索、分页加载、暗黑模式、Canvas 绘制分享海报、代码片段速查等功能
> - 采用云数据库直连 + 本地缓存兜底降级策略，云服务不可用时自动切换离线模式，保证可演示
> - GitHub 开源：github.com/shuxiangmengqian/programming-dictionary

## 📁 目录结构

```
├── app.js                 # 小程序入口，云开发初始化、主题状态
├── app.json               # 页面注册、tabBar 配置
├── app.wxss               # 全局样式
├── pages/
│   ├── home/              # 首页：打字机问候、每日一词、语言入口
│   ├── index/             # 词典主列表：分类筛选、搜索、分页加载
│   ├── friend/            # 代码速查库：常用片段搜索
│   ├── vocab_list/        # 词汇列表：全部/已攻克
│   ├── me/                # 我的：学习进度、登录、关于
│   └── share_poster/      # 分享海报生成
├── utils/
│   ├── mock_data.js       # 200 词示例数据 + 离线过滤逻辑
│   └── util.js            # 工具函数
├── static/tabbar/         # tabBar 图标
└── cloud_import.json      # 云数据库导入文件（200 词）
```

## 🚀 本地运行

1. 克隆本仓库到本地：
   ```
   git clone https://github.com/shuxiangmengqian/programming-dictionary.git
   ```
2. 打开 **微信开发者工具**，导入项目文件夹
3. 在 `app.js` 中把云开发环境 ID 改成你自己的：
   ```js
   wx.cloud.init({ env: '你的云环境ID', traceUser: true })
   ```
4. 在云开发控制台新建集合 `programming_words`，导入 `cloud_import.json`
5. 编译运行即可

## 📊 数据结构

云数据库集合 `programming_words`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| word | string | 英文单词 |
| meaning | string | 中文释义 |
| explanation | string | 通俗解释 |
| code | string | 代码示例 |
| language | string | 所属语言：HTML/CSS/JavaScript/Python/Java |
| isMastered | boolean | 是否标记为已掌握 |

## 📝 后续计划

- [ ] 用户级掌握记录（按 openid 隔离，当前共享在词表上）
- [ ] 语音朗读单词发音
- [ ] 生词本、每日推荐算法
- [ ] 更多语言（Go / Rust / SQL）
