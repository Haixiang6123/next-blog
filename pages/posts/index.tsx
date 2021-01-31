import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'
import getDBConnection from 'lib/getDBConnection'
import {Post} from 'src/entity/Post'
import qs from 'querystring'

type Props = {
  posts: Post[];
  page: number;
  perPage: number;
  count: number;
}

const PostsIndex: NextPage<Props> = (props) => {
  const {page, posts, count, perPage} = props

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

      <footer>
        共 {count} 篇文章，当前是第 {page} 页
        <Link href={`/posts?page=${page - 1}`}>
          <a>上一页</a>
        </Link>
        |
        <Link href={`/posts?page=${page + 1}`}>
          <a>下一页</a>
        </Link>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDBConnection()

  const [_, queryStr] = context.req.url.split('?')
  const queryObj = qs.parse(queryStr)

  const page = parseInt(queryObj.page.toString() || '1') || 1
  const perPage = 2;

  const [posts, count] = await connection.manager.findAndCount(
    Post, {skip: perPage * (page - 1), take: perPage}
  )

  return {
    props: {
      posts: posts ? JSON.parse(JSON.stringify(posts)) : [],
      page,
      perPage,
      count,
    }
  }
}

export default PostsIndex
