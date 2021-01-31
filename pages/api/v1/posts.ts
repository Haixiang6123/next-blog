import {NextApiHandler} from 'next'
import {Post} from 'src/entity/Post'
import getDBConnection from 'lib/getDBConnection'
import withSession from 'lib/withSession'

// 只在 Node 环境里运行
const Posts: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const {title, content} = req.body;

    const user = req.session.get('currentUser');

    const post = new Post();

    post.title = title;
    post.content = content;
    post.author = user;

    const connection = await getDBConnection();

    await connection.manager.save(post);

    res.json(post);
  }
}

export default withSession(Posts);
