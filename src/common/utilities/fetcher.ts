import { QueryCache } from 'react-query';
import i18n from '../../i18n';
import { convertToFormData } from './formData';
import { isInErrorsList, openNotification } from './notification';

type FetchHeader = {
  'Content-Type'?: string;
  authorization?: string;
  locale: string;
};

type FetcherOptions = Omit<RequestInit, 'body'> & {
  body?: any;
  hasFiles?: boolean;
  showError?: boolean;
  successMessage?: string;
};

const queryCache = new QueryCache();

const fetcher = (
  endpoint: string,
  {
    body,
    hasFiles = false,
    showError = true,
    successMessage,
    ...customConfig
  }: FetcherOptions = {},
) => {
  const token = localStorage.getItem('token');
  const locale = localStorage.getItem('locale') ?? 'fr';

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
    (config as RequestInit).body = hasFiles ? convertToFormData(body) : JSON.stringify(body);
  }

  return window.fetch(endpoint, config as RequestInit).then(async (response) => {
    if (response.status === 401 && endpoint !== '/api/v1/users/auth?action=pro') {
      queryCache.clear();
      localStorage.removeItem('token');
      window.location.assign(window.location as any);
      return Promise.reject(new Error('You need to re-authenticate !'));
    }

    let data;

    if (response.status !== 204) data = await response.json();

    if (response.status === 400 && data.error.code === 'user blocked') {
      window.dispatchEvent(new CustomEvent('suspended_event', { detail: { suspended: true } }));
      return Promise.reject(new Error("You account's suspended !"));
    }

    if (JSON.parse(window.localStorage.getItem('suspended')!)) {
      window.dispatchEvent(new CustomEvent('suspended_event', { detail: { suspended: false } }));
    }

    const responseHeaders: Headers & {
      authorization?: string;
    } = response.headers;

    if (response.ok) {
      if (successMessage)
        openNotification('success', {
          message: successMessage,
        });

      const authorization: string | null = responseHeaders.get('authorization');
      if (authorization) localStorage.setItem('token', authorization);
      return data;
    }

    if (showError && config.method !== 'GET') {
      const isWarning = isInErrorsList(data?.error?.code);
      openNotification(isWarning ? 'warning' : 'error', {
        message: isWarning ? i18n.t(data.error.code) : i18n.t('Something went wrong!'),
      });
    }

    return Promise.reject(data);
  });
};

export default fetcher;
