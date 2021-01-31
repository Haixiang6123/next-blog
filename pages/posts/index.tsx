import {GetServerSideProps, NextPage} from 'next'
import Link from 'next/link'
import getDBConnection from 'lib/getDBConnection'
import {Post} from 'src/entity/Post'
import qs from 'querystring'
import usePager from 'hooks/usePager'

type Props = {
  posts: Post[];
  page: number;
  perPage: number;
  totalPage: number;
}

const PostsIndex: NextPage<Props> = (props) => {
  const {page, posts, totalPage} = props

  const urlMaker = (n: number) => `/posts?page=${n}`;

  const {pager} = usePager({totalPage, page, urlMaker});

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
        {pager}
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDBConnection()

  const [_, queryStr] = context.req.url.split('?')
  const queryObj = qs.parse(queryStr)

  const page = queryObj.page ? parseInt(queryObj.page.toString() || '1') : 1;
  const perPage = 1;

  const [posts, count] = await connection.manager.findAndCount(
    Post, {skip: perPage * (page - 1), take: perPage}
  )

  return {
    props: {
      posts: posts ? JSON.parse(JSON.stringify(posts)) : [],
      page,
      perPage,
      totalPage: Math.ceil(count / perPage)
    }
  }
}

export default PostsIndex
