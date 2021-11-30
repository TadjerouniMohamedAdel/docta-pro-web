export type SubscriptionPlan = {
  id: string;
  title: string;
  price: number;
};

export type PaymentType = {
  id: string;
  type: string;
};

export type InvoiceType = {
  date:Date,
   plan:SubscriptionPlan,
   quotation:string,
   paymentReciept:string|null,
   status: 'unpaid' | 'pending' | 'approved'
};