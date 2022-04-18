import { withRouter } from "next/router";

const Index = ({ router }) => {
  const { query } = router.query;
  return (
    <div>
      <p>Search Page</p>
      <p>query: {query}</p>
    </div>
  );
};

Index.getInitialProps = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, 1500);
  });
};

export default withRouter(Index);
