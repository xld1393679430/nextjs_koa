import Link from "next/link";
import getConfig from "next/config";
import { useEffect } from "react";
const api = require("../lib/api");

const { publicRuntimeConfig } = getConfig();

const IndexDemo = () => {
  useEffect(() => {
    axios.get("/api/user/info").then((res) => {
      console.log(res, "/api/user/info---res");
    });
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

const Index = ({ data }) => {
  return (
    <div>
      <p>Index</p>
      <Link href="/detail">
        <a>去Detail页面</a>
      </Link>
    </div>
  );
};

Index.getInitialProps = async ({ ctx }) => {
  let result = await api.request(
    {
      url: "/search/repositories?q=react",
    },
    ctx.req,
    ctx.res
  );
  return {
    data: result.data,
  };
};

export default Index;
