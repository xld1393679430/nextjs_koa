import { Button } from "antd";
import Link from "next/link";
import Router from "next/router";
class Index extends React.Component {
  handleRouterNavigation = () => {
    // Router.push("/detail");
    Router.push({
      pathname: "/demo/detail",
      query: {
        id: 2,
      },
    });
  };

  render() {
    return (
      <div>
        <p>Index</p>
        <Link href="/demo/detail?id=1" as="/demo/detail/1">
          <Button>使用Link跳转到Detail页面</Button>
        </Link>

        <br />
        <Button onClick={this.handleRouterNavigation}>
          使用Router方式跳转
        </Button>

        <br />

        <Link href="/demo/route-events">
          <Button>查看Router生命周期函数</Button>
        </Link>

        <br />
        <Link href="/demo/get-initial-props">
          <Button>GetInitialProps介绍</Button>
        </Link>

        <br />
        <Link href="/demo/lazy-module">
          <Button>异步加载模块</Button>
        </Link>

        <br />
        <Link href="/demo/lazy-compoent">
          <Button>异步加载组件</Button>
        </Link>
      </div>
    );
  }
}

export default Index;
