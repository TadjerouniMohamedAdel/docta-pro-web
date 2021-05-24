import { notification } from 'antd';
import { IconType, ArgsProps } from 'antd/lib/notification';

const errorsList: [string] = ['time slot already booked'];

export const isInErrorsList = (errorCode: string) => {
  return errorsList.filter((item) => item === errorCode).length > 0;
};

export const openNotification = (type: IconType, { ...args }: ArgsProps) => {
  notification.config({
    placement: 'topRight',
  });

  notification[type]({
    ...args,
  });
};
