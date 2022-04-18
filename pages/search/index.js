import { memo, isValidElement } from "react";
import { withRouter } from "next/router";
import queryString from "query-string";
import { Row, Col, List, Pagination } from "antd";
import Link from "next/link";
import Repo from "../../components/Repo";
const api = require("../../lib/api");

function noop() {}
const LANGUAGES = ["Javascript", "HTML", "CSS", "TypeScript", "Java", "Rust"];
const SORT_TYPES = [
  {
    name: "Best Match",
  },
  {
    name: "Most Stars",
    value: "stars",
    order: "desc",
  },
  {
    name: "Fewest Stars",
    value: "stars",
    order: "asc",
  },
  {
    name: "Most Forks",
    value: "forks",
    order: "desc",
  },
  {
    name: "Fewest Forks",
    value: "forks",
    order: "asc",
  },
];
const selectedStyle = {
  borderLeft: "2px solid #e36209",
  fontWight: 100,
};
const FilterLink = memo(({ name, query, lang, sort, order, page }) => {
  const queryObj = {
    query,
    lang,
    sort,
    order,
    page,
  };
  const queryStr = queryString.stringify(queryObj);
  const href = `/search?${queryStr}`;
  return <Link href={href}>{isValidElement(name) ? name : <a>{name}</a>}</Link>;
});

/**
 * sort: 排序方式
 * order: 排序顺序（正序、倒序）
 * lang: 仓库开发主语言
 * page: 分页页面
 */
const Index = ({ router, repos }) => {
  const { ...querys } = router.query;
  const { lang, sort, order, page } = router.query;
  console.log(repos.total_count, "----repos");

  return (
    <div className="root">
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={<span className="list-header">语言</span>}
            style={{ marginBottom: 20 }}
            dataSource={LANGUAGES}
            renderItem={(item) => {
              const selected = lang === item;
              return (
                <List.Item style={selected ? selectedStyle : null}>
                  {selected ? (
                    <span>{item}</span>
                  ) : (
                    <FilterLink {...querys} lang={item} name={item} page={1} />
                  )}
                </List.Item>
              );
            }}
          />

          <List
            bordered
            header={<span className="list-header">排序</span>}
            style={{ marginBottom: 20 }}
            dataSource={SORT_TYPES}
            renderItem={(item) => {
              let selected = false;
              if (!sort && item.name === SORT_TYPES[0].name) {
                selected = true;
              } else if (item.value === sort && item.order === order) {
                selected = true;
              }
              return (
                <List.Item style={selected ? selectedStyle : null}>
                  {selected ? (
                    <span>{item.name}</span>
                  ) : (
                    <FilterLink
                      {...querys}
                      name={item.name}
                      order={item.order}
                      sort={item.value}
                    />
                  )}
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={18}>
          <h3 className="repos-title">{repos.total_count} 个仓库</h3>
          {repos.items.map((repo) => {
            return <Repo key={repo.id} repo={repo} />;
          })}
          <Pagination
            total={repos.total_count}
            pageSize={30}
            current={Number(page) || 1}
            onChange={noop}
            itemRender={(page, type, ol) => {
              let p;
              let name;
              if (type === "page") {
                p = page;
                name = page;
              } else if (type === "prev") {
                p = page - 1;
                // name = ol;
              } else if (type === "next") {
                p = page + 1;
                // name = ol;
              } else if (type === "jump-prev") {
                p = page;
                name = ol;
              } else if (type === "jump-next") {
                p = page;
                name = ol;
              }

              return <FilterLink {...querys} page={p} name={name} />;
            }}
          />
        </Col>
      </Row>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
        }
        .repos-title {
          border-bottom: 1px solid #eee;
          font-size: 24px;
          line-height: 50px;
        }
      `}</style>
    </div>
  );
};

Index.getInitialProps = async ({ ctx }) => {
  const { query, sort, lang, order, page } = ctx.query;
  if (!query) {
    return {
      repos: {
        total_count: 0,
      },
    };
  }

  const queryObj = {
    q: query,
    sort: sort || undefined,
    language: lang || undefined,
    order: order || "desc",
    page: page || 1,
  };
  const queryStr = queryString.stringify(queryObj);

  let result = {
    data: {},
  };
  try {
    const url = `/search/repositories?${queryStr}`;
    result = await api.request(
      {
        url,
      },
      ctx.req,
      ctx.res
    );
  } catch (error) {}

  return {
    repos: result.data,
  };
};

export default withRouter(Index);
