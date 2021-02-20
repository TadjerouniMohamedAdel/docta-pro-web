import moment from 'moment';

export const convertDateUTC = (date: Date): Date => {
  const newDate = moment(
    `${moment(date).year()}-${moment(date).month() + 1}-${moment(date).date()} 12:00`,
    'YYYY-MM-DD HH:mm',
  ).toDate();
  return newDate;
};

export const getWeekRange = (date: Date): { start: Date; end: Date } => {
  const start = moment(date).subtract(moment(date).day(), 'day').toDate();
  const end = moment(date)
    .add(6 - moment(date).day(), 'day')
    .toDate();
  return { start, end };
};
