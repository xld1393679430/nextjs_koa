import Link from "next/link";
import { Button } from "antd";
import { withRouter } from "next/router";

class Index extends React.Component {
  render() {
    return (
      <div>
        <p>Index</p>
        <Link href="/demo">to view demo</Link>
      </div>
    );
  }
}

export default withRouter(Index);
