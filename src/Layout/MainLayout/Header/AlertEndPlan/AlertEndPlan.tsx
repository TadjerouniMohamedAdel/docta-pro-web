import React from 'react';
import './styles.less';

type Props = {
  planName: string;
  endDays: number;
};

const AlertEndPlan: React.FC<Props> = ({ planName, endDays }) => {
  return (
    <div className="free-trial">
      {endDays > 0
        ? `The Plan ${planName} ends in ${endDays} ${endDays > 1 ? 'days' : 'day'}`
        : 'The previous plan was expired'}
    </div>
  );
};

export default AlertEndPlan;
