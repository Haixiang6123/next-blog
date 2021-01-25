import React, {useCallback} from 'react'
import Link from 'next/link'

// Node.js 和浏览器都会被打印
console.log('执行了')

export default function FirstPost() {
  const clickMe = useCallback(() => {
    // 只会在浏览器里执行
    console.log('you click me');
  }, []);

  return (
    <div>
      First Post
      <button onClick={clickMe}>Click Me</button>
      <hr/>
      回到首页
      <Link href="/">
        点击这里
      </Link>
    </div>
  )
}