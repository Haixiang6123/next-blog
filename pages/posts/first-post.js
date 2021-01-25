import React from 'react';
import Link from 'next/link';

export default function FirstPost() {
    return (
        <div>
            First Post
            <hr/>
            回到首页
            <Link href="/">
                点击这里
            </Link>
        </div>
    )
}