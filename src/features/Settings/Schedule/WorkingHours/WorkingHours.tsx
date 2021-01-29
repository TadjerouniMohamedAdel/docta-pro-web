import { Divider } from 'antd';
import React from 'react';
import { WorkingHoursSchedule } from '../types';
import WorkingHoursItem from './WorkingHoursItem/WorkingHoursItem';

type Props = {
  workingHoursSchedule: WorkingHoursSchedule[];
  handleUpdateData: (values: WorkingHoursSchedule[]) => void;
};

const WorkingHours: React.FC<Props> = ({ workingHoursSchedule, handleUpdateData }) => {
  const handleUpdateWorkingHours = (day: number, data: WorkingHoursSchedule) => {
    const updatedWorkingHoursSchedule = [...workingHoursSchedule];
    const index = updatedWorkingHoursSchedule.findIndex((item) => item.dayOfWeek === day);

    if (index > -1) {
      updatedWorkingHoursSchedule[index] = data;
      handleUpdateData(updatedWorkingHoursSchedule);
    }
  };

  return (
    <div>
      {workingHoursSchedule
        .sort((a, b) => (a.dayOfWeek > b.dayOfWeek ? 1 : -1))
        .map((item) => (
          <>
            <div style={{ padding: '24px 80px' }} key={item.id}>
              <WorkingHoursItem
                workingHourDetails={item}
                handleUpdateData={handleUpdateWorkingHours}
              />
            </div>
            <Divider />
          </>
        ))}
    </div>
  );
};

export default WorkingHours;
