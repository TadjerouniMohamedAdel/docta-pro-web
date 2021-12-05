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
  successMessage,
}: {
  planId: string;
  paymentMethodId?: string | undefined;
  paymentInfo?: any;
  successMessage?: string;
}): Promise<any> => {
  return fetcher('/api/v1/subscriptions/pick-plan', {
    body: { planId, paymentMethodId, paymentInfo },
    successMessage,
  });
};

export const fetchInvoices = async (page: number, size: number): Promise<any> => {
  return fetcher(`/api/v1/subscriptions/invoices?skip=${(page - 1) * size}&take=${size}`, {});
};

export const uploadReceipt = async ({
  paymentId,
  file,
}: {
  paymentId: string;
  file: any;
}): Promise<any> => {
  return fetcher('/api/v1/subscriptions/receipt', {
    body: { paymentId, file },
    method: 'PUT',
    hasFiles: true,
  });
};
