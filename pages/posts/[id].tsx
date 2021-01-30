import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import getDBConnection from '../../lib/getDBConnection'
import {Post} from '../../src/entity/Post'

type Props = {
  post: Post;
}

const PostsShow: NextPage<Props> = (props) => {
  const {post} = props;

  return (
    <div>
      <h1>{post.title}</h1>
      <article>{post.content}</article>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<any, {id: string}> = async (context) => {
  const connection = await getDBConnection();

  const post = await connection.manager.findOne(Post, context.params.id)

  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}

export default PostsShow;
