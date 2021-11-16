import React, { useMemo, useState, Suspense, ReactChildren, ReactNode } from "react";
import {unstable_createResource, unstable_setGlobalCacheLimit} from 'react-cache';

import '../setLog';

unstable_setGlobalCacheLimit(0);

window.element = <h1>Hello, world!</h1>;



const redditResource = unstable_createResource(
  (subreddit: string) => fetch(`https://www.reddit.com/r/${subreddit}.json`, {mode: 'cors'}
).then(res => {
  return res.json();
}));

export default function App() {
  const [num, updateNum] = useState(0);
  return (
    <div>
      <button onClick={() => updateNum(num + 1)}>add {num}</button>
      <Suspense fallback={'loading...'}>
        <Posts subreddit="reactjs"/>
      </Suspense>
      <Title data={num}>App</Title>
    </div>
  )
}

function Posts({ subreddit }) {
  const json = redditResource.read(subreddit);
  const posts = json.data.children.map((child) => child.data);
  return (
    <ul>
      <Title>Post</Title>
      {posts.map((post, i) => (
        <li key={i}>{post.title}</li>
      ))}
    </ul>
  );
}

function Title({children, data}: {children: ReactNode, data: any}) {
  console.log('Title render', children);
  return <h3>{children} {data}</h3>;
}