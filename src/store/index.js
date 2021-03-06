import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modulos/rootReducer';
import rootSaga from './modulos/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddlewares = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddlewares];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddlewares.run(rootSaga);

export { store, persistor };
