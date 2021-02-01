FROM node:14

# 指定工作目录
WORKDIR /usr/src/app

# 复制和 yarn 有关的文件
COPY package.json ./
COPY yarn.lock ./

# 执行依赖安装
RUN yarn cache clean && yarn install

# 将当前目录都拷贝
COPY . .

# 暴露代码
EXPOSE 3000

CMD ["yarn", "next:start"]
