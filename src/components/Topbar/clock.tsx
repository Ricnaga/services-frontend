import { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { BsClock } from 'react-icons/bs';
import { getDateCalendarHour } from '../../utils/date';

export function LiveClock() {
  const [clock, setClock] = useState<String | null>(getDateCalendarHour());

  useEffect(() => {
    setInterval(() => {
      setClock(null);
      setClock(getDateCalendarHour());
    }, 30000);
  }, [clock]);

  return (
    <Navbar.Text>
      <BsClock className="mx-2" />
      {clock}
    </Navbar.Text>
  );
}
