import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage,
      wihtelist: ['auth', 'profile'],
    },
    reducers
  );

  return persistedReducer;
};
