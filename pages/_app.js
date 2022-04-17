import App, { Container } from "next/app";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import withRedux from "../lib/with-redux";
import Layout from "../components/Layout";

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Layout>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>
    );
  }
}

export default withRedux(MyApp);
