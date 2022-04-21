import { Tabs } from "antd";
import WithRepoBasic from "../../components/WithRepoBasic";

const Index = ({ text }) => {
  return (
    <div>
      <p>Detail - { text }</p>
    </div>
  );
};

Index.getInitialProps = async ({ router, ctx }) => {
  return {
    text: 123
  }
}

export default WithRepoBasic(Index, 'index');
