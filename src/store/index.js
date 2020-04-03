import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rooReducer from './modulos/rootReducer';
import rooSaga from './modulos/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddlewares = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddlewares];

const store = createStore(rooReducer, middlewares);

sagaMiddlewares.run(rooSaga);

export default store;
