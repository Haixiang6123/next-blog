import React, {useEffect} from 'react'
import {GetServerSideProps, NextPage} from 'next'
import getDBConnection from '../lib/getDBConnection'
import {Post} from '../src/entity/Post'

type Props = {
  posts: Post[],
}

const Index: NextPage<Props> = (props) => {
  const {posts} = props;

  useEffect(() => {
  }, []);

  return (
    <div>
      {posts.map(p => (
        <div key={p.id}>{p.title}</div>
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
