import React, { useState, useCallback } from "react";
import { Layout, Icon, Input, Avatar } from "antd";

const { Header, Content, Footer } = Layout;
const githubIconStyle = {
  color: "#fff",
  fontSize: 40,
  display: "block",
  marginRight: 20,
};

const Index = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Layout>
      <Header>
        <div className="header-inner">
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle}></Icon>
            </div>
            <div>
              <Input.Search
                placeholder="搜索参考"
                value={searchValue}
                onChange={handleChangeSearch}
                onSearch={handleSubmit}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar size={40} icon="user" />
            </div>
          </div>
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        <span>
          Develop by xld @{" "}
          <a href="mailto:xld139369430@outloock">xld139369430@outloock</a>{" "}
        </span>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default Index;
