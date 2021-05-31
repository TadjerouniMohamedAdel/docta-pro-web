import { DatePicker } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import { Button, Icon } from '../../../../components';
import './styles.less';

type Props = {
  date: Date;
  handleUpdateDate: (date: Date) => void;
};

const HeaderDatePicker: React.FC<Props> = ({ date, handleUpdateDate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} size="small" type="text">
        <Icon name="arrow-down-s-fill" />
      </Button>
      <DatePicker
        open={open}
        className="header-date-picker-input"
        dropdownClassName="header-date-picker-box"
        value={moment(date)}
        onChange={(value) => handleUpdateDate(value?.toDate() || new Date())}
        onOpenChange={(value) => setOpen(value)}
      />
    </div>
  );
};

export default HeaderDatePicker;
