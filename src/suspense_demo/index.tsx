import React, { useMemo, useState, Suspense } from "react";
import {unstable_createResource, unstable_setGlobalCacheLimit} from 'react-cache';

import './setLog';

unstable_setGlobalCacheLimit(0);


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
    </div>
  )
}

function Posts({ subreddit }) {
  console.log('render');
  const json = redditResource.read(subreddit);
  const posts = json.data.children.map((child) => child.data);
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>{post.title}</li>
      ))}
    </ul>
  );
}