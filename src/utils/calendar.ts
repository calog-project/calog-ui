export const getDayClass = (isCurrentMonth: boolean, isSunday: boolean, isSaturday: boolean) => {
  if (!isCurrentMonth) return 'opacity-30 text-gray-98';
  if (isSunday) return 'text-red';
  if (isSaturday) return 'text-blue-33';
  return 'text-gray-98';
};
