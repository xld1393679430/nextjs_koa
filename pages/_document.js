import Document, { Html, Head, Main, NextScript } from "next/document";

// Document只有在服务端渲染才会被调用
// 用来修改服务端渲染的文档内容
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);
    return {
      ...props,
    };
  }
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
