import { queryCache } from 'react-query';

type FetchHeader = {
  'Content-Type'?: string;
  Authorization?: string;
  locale: string;
};

function fetcher(endpoint: string, { body, ...customConfig }: any = {}) {
  const token = localStorage.getItem('token');
  const locale = localStorage.getItem('locale') ?? 'en';

  const headers: FetchHeader = { 'Content-Type': 'application/json', locale };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  return window.fetch(endpoint, config).then(async (response) => {
    if (response.status === 401 && endpoint !== '/api/v1/users/auth?action=pro') {
      queryCache.clear();
      localStorage.removeItem('token');
      window.location.assign(window.location as any);
      return Promise.reject(new Error('You need to re-authenticate !'));
    }
    const data = await response.json();

    const responseHeaders: Headers & {
      authorization?: string;
    } = response.headers;

    if (response.ok) {
      const authorization: string | null = responseHeaders.get('authorization');
      if (authorization) localStorage.setItem('token', authorization);
      return data;
    }
    return Promise.reject(data);
  });
}

export default fetcher;
