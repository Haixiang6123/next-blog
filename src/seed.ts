import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {User} from './entity/User'
import {Post} from './entity/Post'
import {Comment} from './entity/Comment'

createConnection().then(async connection => {
  const {manager} = connection;

  // 创建用户
  const u1 = new User();

  u1.username = 'jack';
  u1.passwordDigest = 'xxx';

  await manager.save(u1);

  // 创建文章
  const p1 = new Post();

  p1.title = 'Post 1'
  p1.content = '我的第一篇文章'
  p1.author = u1;

  await manager.save(p1);

  // 创建评论
  const c1 = new Comment();
  c1.user= u1;
  c1.post = p1;
  c1.content = 'awesome';

  await manager.save(c1);

  console.log(u1.id)

  await connection.close()
}).catch(error => console.log(error))
