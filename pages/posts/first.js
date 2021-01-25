import React from 'react'
// 使用 CSS 模块化
import styles from 'styles/first.module.css'

// Node.js 和浏览器都会被打印
console.log('执行了')

export default function First() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          内容
        </div>
      </div>
    </>
  )
}