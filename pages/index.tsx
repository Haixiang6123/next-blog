import React, {useEffect} from 'react'
import {GetServerSideProps, NextPage} from 'next'
import getDBConnection from '../lib/getDBConnection'
import {Post} from '../src/entity/Post'
import Link from 'next/link'

type Props = {
  posts: Post[],
}

const Index: NextPage<Props> = (props) => {
  const {posts} = props;

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(p => (
        <Link key={p.id} href={`/posts/${p.id}`}>
          <a>{p.title}</a>
        </Link>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDBConnection();

  const posts = await connection.manager.find(Post);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}

export default Index
