import 'reflect-metadata';
import {createConnection, getConnectionManager} from 'typeorm'
import {Post} from 'src/entity/Post';
import {User} from 'src/entity/User';
import {Comment} from 'src/entity/Comment';
import config from 'ormconfig.json';

const create = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Post, User, Comment]
  });
}

// 获取 connection 的方法
const promise = (async function () {
  const manager = getConnectionManager();

  const hasDefaultConnection = manager.has('default');

  // 开发环境需要判断是否已经存在 connection
  if (!hasDefaultConnection) {
    return create();
  } else {
    const current = manager.get('default');

    return current.isConnected ? current : create()
  }
})();

const getDBConnection = async () => {
  return promise;
}

export default getDBConnection;
