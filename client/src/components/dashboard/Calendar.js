import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
export const Schedule = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="container-fluid">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};
