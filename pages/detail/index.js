import WithRepoBasic from "../../components/WithRepoBasic";
import MarkdownRender from "../../components/MarkdownRender";
const api = require("../../lib/api");

const Index = ({ readme }) => {
  return <MarkdownRender content={readme.content} isBase64={true} />;
};

Index.getInitialProps = async ({ router, ctx }) => {
  const { owner, name } = ctx.query;
  const readmeResp = await api.request(
    {
      url: `/repos/${owner}/${name}/readme`,
    },
    ctx.req,
    ctx.res
  );

  return {
    readme: readmeResp.data,
  };
};

export default WithRepoBasic(Index, "index");
