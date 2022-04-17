import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

const initialCounterState = {
  count: 1,
};

const counterReducer = (state = initialCounterState, action) => {
  console.log(action, 'counterReducer');
  switch (action.type) {
    case "Add":
      return {
        ...state,
        count: state.count + action.payload.count,
      };
    case "Del":
      return {
        ...state,
        count: state.count - action.payload.count,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(
  rootReducer,
  {
    counter: initialCounterState,
  },
  applyMiddleware(reduxThunk)
);

function asyncAdd(count = 10) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: "Add",
        payload: {
          count,
        },
      });
    }, 500);
  };
}

store.subscribe(() => {
  console.log("---store changed----", store.getState());
});
store.dispatch(asyncAdd());

export default store;
