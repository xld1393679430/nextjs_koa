import App, { Container } from "next/app";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import withRedux from "../lib/with-redux";

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    const initialProps = Component.getInitialProps;
    let pageProps;
    if (initialProps) {
      pageProps = await initialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(MyApp);
