import {createConnection, getConnectionManager} from 'typeorm'

// 获取 connection 的方法
const promise = (async function () {
  const manager = getConnectionManager();

  const hasDefaultConnection = manager.has('default');

  // 开发环境需要判断是否已经存在 connection
  if (!hasDefaultConnection) {
    return createConnection();
  } else {
    const current = manager.get('default');

    return current.isConnected ? current : createConnection()
  }
})();

const getDBConnection = async () => {
  return promise;
}

export default getDBConnection;
