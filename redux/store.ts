import { createStore, Store, Middleware, compose, StoreEnhancer, applyMiddleware } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper';

import reducers from './root-reducers'
import rootSaga from './sagas'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export interface SagaStore extends Store {
  sagaTask?: Task;
}

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};


export const makeStore: MakeStore<any> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, bindMiddleware([sagaMiddleware]));
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<SagaStore>(makeStore, { debug: false });