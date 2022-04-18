import React, { useState, useCallback } from "react";
import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from "antd";
import getConfig from "next/config";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import axios from "axios";
import Container from "../Container";
import { logout } from "../../store";

const { publicRuntimeConfig } = getConfig();

const { Header, Content, Footer } = Layout;
const githubIconStyle = {
  color: "#fff",
  fontSize: 40,
  display: "block",
  marginRight: 20,
};

const Index = ({ children, user, logout, router }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {}, []);

  const handleLogout = useCallback(async () => {
    logout();
  }, [logout]);

  const handleOAuth = useCallback((event) => {
    event.preventDefault();
    axios.get(`/prepare-auth?url=${router.asPath}`).then((res) => {
      if (res.status === 200) {
        location.href = publicRuntimeConfig.OAUTH_URL;
      }
    });
  }, [router]);

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
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
              {user && user.id ? (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={handleLogout}>登出</Menu.Item>
                    </Menu>
                  }
                >
                  <Avatar size={40} src={user.avatar_url} />
                </Dropdown>
              ) : (
                <Tooltip title="点击登录">
                  <a href="javascript:void(0)" onClick={handleOAuth}>
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Container>
          Develop by xld @{" "}
          <a href="mailto:xld139369430@outloock">xld139369430@outloock</a>{" "}
        </Container>
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
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
