import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { zhCN } from 'date-fns/locale';

const YourComponent = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const handleDateRangeChange = (ranges: { selection: { startDate: Date; endDate: Date; key: string; }; }) => {
    // 更新日期範圍狀態
    setState([ranges.selection]);
  };

  return (
    <DateRangePicker
      onChange={handleDateRangeChange}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
      direction="horizontal"
      preventSnapRefocus={true}
      calendarFocus="backwards"
      locale={zhCN}
      
    />
  );
};

export default YourComponent;