import WithRepoBasic from "../../components/WithRepoBasic";
const api = require("../../lib/api");

const Index = ({ readme }) => {
  console.log(readme, 'readme----')
  return (
    <div>
      <p>Detail</p>
      <span>{atob(readme.content)}</span>
    </div>
  );
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
