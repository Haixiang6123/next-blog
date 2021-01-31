import {GetStaticProps, NextPage} from 'next';
import {getPosts} from 'lib/posts';
import Link from 'next/link';
import getDBConnection from '../../lib/getDBConnection'
import {Post} from '../../src/entity/Post'

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props;

  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(p => (
        <Link key={p.id} href={`/posts/${p.id}`}>
          <a>{p.id}</a>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const connection = await getDBConnection();
  const posts = await connection.manager.find(Post);

  console.log(posts)

  return {
    props: {
      posts: posts ? JSON.parse(JSON.stringify(posts)) : []
    }
  }
}

export default PostsIndex;
