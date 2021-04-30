import { notification } from 'antd';
import { IconType, ArgsProps } from 'antd/lib/notification';

export const openNotification = (type: IconType, { ...args }: ArgsProps) => {
  notification.config({
    placement: 'topRight',
  });

  notification[type]({
    ...args,
  });
};
