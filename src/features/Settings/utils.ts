export const formatAmount= (amount:number) :string => {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'USD',
    });
      return formatter.format(amount).split(',')[0];
};