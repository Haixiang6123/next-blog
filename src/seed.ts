import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {User} from './entity/User'
import {Post} from './entity/Post'

createConnection().then(async connection => {
  const {manager} = connection;

  const u1 = new User();

  u1.username = 'jack';
  u1.passwordDigest = 'xxx';

  await manager.save(u1);

  const p1 = new Post();

  p1.title = 'Post 1'
  p1.content = '我的第一篇文章'
  p1.author = u1;

  await manager.save(p1);

  console.log(u1.id)

  await connection.close()
}).catch(error => console.log(error))
