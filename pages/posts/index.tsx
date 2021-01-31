import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'
import getDBConnection from 'lib/getDBConnection'
import {Post} from 'src/entity/Post'

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props;

  return (
    <div>
      <h1>文章列表</h1>
      <ul>
        {(posts || []).map(p => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}>
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDBConnection();
  const posts = await connection.manager.find(Post);

  return {
    props: {
      posts: posts ? JSON.parse(JSON.stringify(posts)) : []
    }
  }
}

export default PostsIndex;
