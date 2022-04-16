import { Button } from "antd";
import Link from "next/link";
import Router from "next/router";
class Index extends React.Component {
  handleRouterNavigation = () => {
    Router.push("/detail");
  };
  
  render() {
    return (
      <div>
        <p>Index</p>
        <Link href="/detail" titale="aaaa">
          <Button>使用Link跳转到Detail页面</Button>
        </Link>

        <br />
        <Button onClick={this.handleRouterNavigation}>
          使用Router方式跳转
        </Button>
      </div>
    );
  }
}

export default Index;
