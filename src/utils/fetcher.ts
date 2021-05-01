import { QueryCache } from 'react-query';
import i18n from '../i18n';
import { isInErrorsList, openNotification } from './notification';

type FetchHeader = {
  'Content-Type'?: string;
  authorization?: string;
  locale: string;
};

const queryCache = new QueryCache();

function fetcher(endpoint: string, { body, ...customConfig }: any = {}, hasFiles = false) {
  const token = localStorage.getItem('token');
  const locale = localStorage.getItem('locale') ?? 'en';

  const headers: FetchHeader = {
    locale,
  };

  if (!hasFiles) headers['Content-Type'] = 'application/json';

  if (token) {
    headers.authorization = token;
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
    config.body = hasFiles ? body : JSON.stringify(body);
  }

  return window.fetch(endpoint, config).then(async (response) => {
    if (response.status === 401 && endpoint !== '/api/v1/users/auth?action=pro') {
      queryCache.clear();
      localStorage.removeItem('token');
      window.location.assign(window.location as any);
      return Promise.reject(new Error('You need to re-authenticate !'));
    }

    let data;

    if (response.status !== 204) data = await response.json();

    const responseHeaders: Headers & {
      authorization?: string;
    } = response.headers;

    if (response.ok) {
      const authorization: string | null = responseHeaders.get('authorization');
      if (authorization) localStorage.setItem('token', authorization);
      return data;
    }

    if (isInErrorsList(data?.error?.code))
      openNotification('error', { message: i18n.t(data.error.code) });

    return Promise.reject(data);
  });
}

export default fetcher;
