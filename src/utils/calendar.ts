export const getDayClass = (isSunday: boolean, isSaturday: boolean) => {
  if (isSunday) return 'text-red';
  if (isSaturday) return 'text-blue-33';
  return 'text-gray-89';
};
