import createStore from "../store";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";
function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (Comp) => {
  class withRedux extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return (
        <Comp {...this.props} reduxStore={this.reduxStore} />
      );
    }
  }

  withRedux.getInitialProps = async (ctx) => {
    const reduxStore = getOrCreateStore();
    
    let appProps = {};

    ctx.reduxStore = reduxStore;
    if (typeof Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }
    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  };
  return withRedux;
};
