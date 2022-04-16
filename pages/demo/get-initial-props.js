import { Button } from "antd";
import { withRouter } from "next/router";

class Index extends React.Component {
  render() {
    const { name } = this.props;

    console.log(this.props, 333);
    return (
      <div>
        <p>GetInitialProps</p>
        <span>name： {name}</span>
      </div>
    );
  }
}

Index.getInitialProps = async () => {
  const fetchData = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "joky",
      });
    }, 3000);
  });
  return await fetchData;
};

export default withRouter(Index);
