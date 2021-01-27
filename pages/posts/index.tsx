import {NextPage} from 'next';
import {usePosts} from '../../hooks/usePosts';

const PostsIndex: NextPage = () => {
  const { loading, empty, posts } = usePosts();

  return (
    <div>
      <h1>文章列表</h1>
      {loading ? <div>加载中</div> :
        empty ? <div>没有文章</div> :
        posts.map(p => (
          <div key={p.id}>{p.id}</div>
        ))
      }
    </div>
  )
}

export default PostsIndex;
