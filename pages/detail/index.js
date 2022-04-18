const Index = () => <div>Detail Page</div>;

Index.getInitialProps = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, 1500);
  });
};

export default Index;
