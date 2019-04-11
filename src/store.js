import { createStore, compose, applyMiddleware } from "redux";
// import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
let middlewares = applyMiddleware(sagaMiddleware);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  // compose(middlewares),
  // composeWithDevTools(applyMiddleware(...[middlewares]))
  // composeEnhancers(applyMiddleware(...[middlewares]))
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// sagaMiddleware.run(rootSaga);

export default store;
