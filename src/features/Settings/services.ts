import { fetcher } from '../../common/utilities';

export const fetchSubscriptionPlans = async (): Promise<any> => {
  return fetcher('/api/v1/subscriptions/plans');
};

export const fetchCurrentSubscription = async (): Promise<any> => {
  return fetcher('/api/v1/subscriptions/current-subscription');
};

export const fetchNextSubscription = async (): Promise<any> => {
  return fetcher('/api/v1/subscriptions/next-subscription');
};

export const fetchPaymentMethods = async (): Promise<any> => {
  return fetcher('/api/v1/subscriptions/next-subscription');
};

export const pickPlan = async (): Promise<any> => {};
