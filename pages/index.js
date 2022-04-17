import Link from "next/link";
import getConfig from "next/config";
import { useEffect } from "react";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();

const IndexDemo = () => {
  useEffect(() => {
    axios.get('/api/user/info').then(res => {
      console.log(res, '/api/user/info---res')
    })
  }, []);
  return (
    <>
      <p>Index</p>
      <Link href="/next-demo">
        <a>to view next-demo</a>
      </Link>
      <hr />
      <Link href="/hooks-demo">
        <a>to view hooks-demo</a>
      </Link>
      <hr />
      <Link href="/redux-demo">
        <a>to view redux-demo</a>
      </Link>
      <hr />
      <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>
  );
};

const Index = () => {
  return (
    <div>Index</div>
  )
}

export default Index;
