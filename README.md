# next-blog

使用 Next.js 框架开发的博客系统

## docker 运行

开启一个 postgres 数据库

```bash
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

进入容器

```bash
docker exec -it 容器ID bash
```

## postgres

* \l 显示所有数据库
* \c blog 用于连接 blog 数据库
* \dt 用于 display tables

## 创建数据库

需要三个数据库：开发、测试、生产。对应 development, test, production

```sql
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

CREATE DATABASE blog_test ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

CREATE DATABASE blog_production ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据库迁移

```bash
# 创建迁移版本
npx typeorm migration:create -n CreatePosts

# 开始迁移
npx typeorm migration:run
```

## 运行 src/index.ts

* 安装 @babel/cli
* 安装 @babel/core
* 安装 @babel/plugin-proposal-decorators
* 改写 .babrlrc
  
```json
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}
```

* 编译 TypeScript `npx babel ./src --out-dir dist --extensions ".ts,.tsx"`

## Docker 化应用

参考：https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

