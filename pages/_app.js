import App, { Container } from "next/app";
import "antd/dist/antd.css";

class MyApp extends App {
  static async getInitialProps({ Component }) {
    const initialProps = Component.getInitialProps;
    let pageProps = {};
    if (initialProps) {
      pageProps = await initialProps();
    }

    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    console.log(this.props, "---MyApp---");
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
