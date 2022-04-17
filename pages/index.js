import Link from "next/link";
import { withRouter } from "next/router";

class Index extends React.Component {
  render() {
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
      </>
    );
  }
}

export default withRouter(Index);
