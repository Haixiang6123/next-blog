import {NextApiHandler} from 'next';

// 只在 Node 环境里运行
const Posts: NextApiHandler = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ nam: 'fang'}))
  res.end();
}

export default Posts;
