import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../feature/CryptoApi';
import { cryptoNews } from '../feature/CryptoNewApi';

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNews.reducerPath]: cryptoNews.reducer,
  },
});

export default store;
