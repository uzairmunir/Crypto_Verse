import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '4f7424d16fmshdd35e6de3695582p1d57fbjsna8fe8d73f9c8',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/';

const createRequest = (url) => ({ url, headers: apiHeaders });

export const cryptoNews = createApi({
  reducerPath: 'cryptoNews',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&freshness=Day&textFormat=Raw&safeSearch=Off`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNews;
