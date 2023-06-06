import { useState } from 'react';
import Calendar from 'react-calendar';
export const Schedule = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="container-fluid">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};
