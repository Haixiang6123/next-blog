import React from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {getPost, getPostIds} from 'lib/posts';

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

export const getStaticPaths: GetStaticPaths = async () => {
  const idList = await getPostIds();

  return {
    paths: idList.map(id => ({ params: { id } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // @ts-ignore
  const id = context.params.id;

  const post = await getPost(id as string);

  return {
    props: {
      post,
    }
  }
}

export default PostsShow;
