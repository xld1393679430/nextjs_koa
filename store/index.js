import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialCounterState = {
  count: 1,
};

const counterReducer = (state = initialCounterState, {type, payload}) => {
  const count = payload && payload.count || 100
  switch (type) {
    case "Add":
      return {
        ...state,
        count: state.count + count,
      };
    case "Del":
      return {
        ...state,
        count: state.count - count,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default function initializeStore(state) {
  const store = createStore(
    rootReducer,
    Object.assign(
      {},
      {
        counter: initialCounterState,
      },
      state
    ),
    composeWithDevTools(applyMiddleware(reduxThunk))
  );

  return store;
}
