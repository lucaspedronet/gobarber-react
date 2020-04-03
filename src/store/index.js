import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persistReducers from './persistReducers';

import rooReducer from './modulos/rootReducer';
import rooSaga from './modulos/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddlewares = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddlewares];

const store = createStore(persistReducers(rooReducer), middlewares);
const persistor = persistStore(store);

sagaMiddlewares.run(rooSaga);

export { store, persistor };
