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
  return fetcher('/api/v1/subscriptions/payment-methods');
};

export const pickPlan = async ({
  planId,
  paymentMethodId,
  paymentInfo,
}: {
  planId: string;
  paymentMethodId?: string | undefined;
  paymentInfo?: any;
}): Promise<any> => {
  return fetcher('/api/v1/subscriptions/pick-plan', {
    body: { planId, paymentMethodId, paymentInfo },
  });
};

export const fetchInvoices = async (page:number, size:number): Promise<any> => {
  return fetcher('/api/v1/subscriptions/pick-plan', {
    body: { page, size },
  });
};
