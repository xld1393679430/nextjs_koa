import { Button } from "antd";
import { withRouter } from "next/router";
class Index extends React.Component {
  render() {
    const { router } = this.props;

    console.log(this.props, 333);
    return (
      <div>
        <p>Detail</p>
        <span>parmas  id： {router.query.id}</span>
      </div>
    );
  }
}

export default withRouter(Index);
