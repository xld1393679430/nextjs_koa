import { memo } from "react";
import { withRouter } from "next/router";
import queryString from "query-string";
import { useEffect } from "react";
import { Row, Col, List } from "antd";
import Link from "next/link";
const api = require("../../lib/api");

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
const FilterLink = memo(({ name, query, lang, sort, order }) => {
  const queryObj = {
    query: query || undefined,
    lang: lang || undefined,
    sort: sort || undefined,
    order: order || undefined,
    page: 1,
  };
  const queryStr = queryString.stringify(queryObj);
  const href = `/search?${queryStr}`;
  return (
    <Link href={href}>
      <a>{name}</a>
    </Link>
  );
});

/**
 * sort: 排序方式
 * order: 排序顺序（正序、倒序）
 * lang: 仓库开发主语言
 * page: 分页页面
 */
const Index = ({ router, repos }) => {
  const { ...querys } = router.query;
  const { lang, sort, order } = router.query;

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
                    <FilterLink {...querys} lang={item} name={item} />
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
      </Row>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
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
    sort: sort,
    language: lang,
    order: order || "desc",
    page: page,
  };
  const queryStr = queryString.stringify(queryObj);

  let result = {
    data: undefined,
  };
  try {
    result = await api.request({
      url: `/search/repositories?${queryStr}`,
    });
  } catch (error) {}

  return {
    repos: result.data,
  };
};

export default withRouter(Index);
