/* eslint-disable radix */
import React from 'react';
import { Select as AntSelect } from 'antd';
import moment from 'moment';
import Select from '../../../../../../components/Select/Select';
import Icon from '../../../../../../components/Icon/Icon';

type Props = {
  time: string;
  onChange: (value: string) => void;
  type: 'morning' | 'afternoon';
};

const { Option } = AntSelect;

const HoursSelector: React.FC<Props> = ({ time, onChange, type = 'morning' }) => {
  const formatTime = (h: number, m: number) => {
    return moment('01/01/2020 12:00', 'YYYY-MM-DD HH:mm')
      .utc()
      .set({
        h,
        m,
        s: 0,
        ms: 0,
      })
      .format('LT');
  };

  const morningHours = (
    <>
      <Option value="00:00">{formatTime(0, 0)}</Option>
      <Option value="00:30">{formatTime(0, 30)}</Option>
      <Option value="01:00">{formatTime(1, 0)}</Option>
      <Option value="01:30">{formatTime(1, 30)}</Option>
      <Option value="02:00">{formatTime(2, 0)}</Option>
      <Option value="02:30">{formatTime(2, 30)}</Option>
      <Option value="03:00">{formatTime(3, 0)}</Option>
      <Option value="03:30">{formatTime(3, 30)}</Option>
      <Option value="04:00">{formatTime(4, 0)}</Option>
      <Option value="04:30">{formatTime(4, 30)}</Option>
      <Option value="05:00">{formatTime(5, 0)}</Option>
      <Option value="05:30">{formatTime(5, 30)}</Option>
      <Option value="06:00">{formatTime(6, 0)}</Option>
      <Option value="06:30">{formatTime(6, 30)}</Option>
      <Option value="07:00">{formatTime(7, 0)}</Option>
      <Option value="07:30">{formatTime(7, 30)}</Option>
      <Option value="08:00">{formatTime(8, 0)}</Option>
      <Option value="08:30">{formatTime(8, 30)}</Option>
      <Option value="09:00">{formatTime(9, 0)}</Option>
      <Option value="09:30">{formatTime(9, 30)}</Option>
      <Option value="10:00">{formatTime(10, 0)}</Option>
      <Option value="10:30">{formatTime(10, 30)}</Option>
      <Option value="11:00">{formatTime(11, 0)}</Option>
      <Option value="11:30">{formatTime(11, 30)}</Option>
      <Option value="12:00">{formatTime(12, 0)}</Option>
    </>
  );

  const afternoonHours = (
    <>
      <Option value="12:00">{formatTime(12, 0)}</Option>
      <Option value="12:30">{formatTime(12, 30)}</Option>
      <Option value="13:00">{formatTime(13, 0)}</Option>
      <Option value="13:30">{formatTime(13, 30)}</Option>
      <Option value="14:00">{formatTime(14, 0)}</Option>
      <Option value="14:30">{formatTime(14, 30)}</Option>
      <Option value="15:00">{formatTime(15, 0)}</Option>
      <Option value="15:30">{formatTime(15, 30)}</Option>
      <Option value="16:00">{formatTime(16, 0)}</Option>
      <Option value="16:30">{formatTime(16, 30)}</Option>
      <Option value="17:00">{formatTime(17, 0)}</Option>
      <Option value="17:30">{formatTime(17, 30)}</Option>
      <Option value="18:00">{formatTime(18, 0)}</Option>
      <Option value="18:30">{formatTime(18, 30)}</Option>
      <Option value="19:00">{formatTime(19, 0)}</Option>
      <Option value="19:30">{formatTime(19, 30)}</Option>
      <Option value="20:00">{formatTime(20, 0)}</Option>
      <Option value="20:30">{formatTime(20, 30)}</Option>
      <Option value="21:00">{formatTime(21, 0)}</Option>
      <Option value="21:30">{formatTime(21, 30)}</Option>
      <Option value="22:00">{formatTime(22, 0)}</Option>
      <Option value="22:30">{formatTime(22, 30)}</Option>
      <Option value="23:00">{formatTime(23, 0)}</Option>
      <Option value="23:30">{formatTime(23, 30)}</Option>
      <Option value="00:00">{formatTime(0, 0)}</Option>
    </>
  );

  return (
    <Select
      prefixIcon={<Icon name="time-line" />}
      dropdownMatchSelectWidth={false}
      style={{ width: '100%' }}
      value={time}
      onChange={onChange}
    >
      {type === 'morning' ? morningHours : afternoonHours}
    </Select>
  );
};

export default HoursSelector;
