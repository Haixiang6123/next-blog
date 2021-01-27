import {GetStaticProps, NextPage} from 'next';
import {getPosts} from 'lib/posts';

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props;

  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(p => (
        <div key={p.id}>{p.id}</div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

export default PostsIndex;
