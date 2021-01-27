import {NextApiHandler} from 'next';
import {getPosts} from 'lib/posts';

// 只在 Node 环境里运行
const Posts: NextApiHandler = async (req, res) => {
  const posts = await getPosts();

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(posts))
  res.end();
}

export default Posts;