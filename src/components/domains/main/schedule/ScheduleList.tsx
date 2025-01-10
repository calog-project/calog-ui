const ScheduleList = ({ schedules }: any) => {
  return (
    <div className="w-[400px] min-h-[1000px] flex flex-col items-center gap-4 rounded-4 border border-gray-89 rounded-[8px] p-10">
      <h1 className="text-[20px] font-bold mb-10">{'2024년 12월 25일'}</h1>
      <div className="flex flex-col gap-5 w-full">
        {schedules.map((schedule: any, idx: any) => (
          <div
            key={idx}
            className={`flex gap-5 p-5 w-full rounded hover:bg-blue-76 hover:bg-opacity-10 cursor-pointer`}>
            <span className="w-2" style={{ backgroundColor: schedule.color }} />
            <div className="flex flex-col ">
              <span className="text-black text-[16px] font-semibold">{schedule.title}</span>
              <span className="text-black text-[14px]">{'오후 11:00 ~ 오전 12:00'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
