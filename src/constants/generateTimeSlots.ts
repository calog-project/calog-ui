export const generateTimeSlots = (startHour: number, endHour: number, interval: number) => {
  const timeSlots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }
  return timeSlots;
};
