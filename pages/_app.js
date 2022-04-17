import App, { Container } from "next/app";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import store from "../store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
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
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default MyApp;
