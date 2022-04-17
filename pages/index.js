import Link from "next/link";
import { Button } from "antd";
import { withRouter } from "next/router";

class Index extends React.Component {
  render() {
    return (
      <div>
        <p>Index</p>
        <Link href="/next-demo">to view next-demo</Link>
        <hr />
        <Link href="/hooks-demo">to view hooks-demo</Link>
      </div>
    );
  }
}

export default withRouter(Index);
