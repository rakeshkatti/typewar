import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
  let middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger);
  }

  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default configureStore;