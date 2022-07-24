export const getDateCalendarHour = () =>
  new Date().toLocaleDateString('pt-br', {
    year: 'numeric',
    month: 'long' || 'short' || 'numeric',
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
