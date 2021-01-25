import Head from 'next/head';
import React from 'react'
// 全局 css 只能放到 _app.js 里
import 'styles/globals.css'

function App({ Component, pageProps }) {
  console.log('app')

  return (
    <>
      <Head>
        <title>我的博客</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
