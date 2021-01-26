import React from 'react';
import png from 'public/images.jpg';

export default function Index() {
  return (
    <div>
      <h1>标题1</h1>
      <p>段落</p>

      <img src={png} alt=""/>

      {/*像 Vue 的样式写法，局部写样式*/}
      <style jsx>{`
        h1 {
          color: red
        }
      `}</style>
    </div>
  )
}
