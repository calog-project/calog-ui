import { useScheduleStore } from '@/stores/scheduleStore';
import { MdOutlineCancel } from 'react-icons/md';

const JoinerTagField = ({}: {}) => {
  const { joiner, setJoiner } = useScheduleStore();

  const removeTag = (tagId: number) => {
    const updatedTags = joiner.filter((_, id) => id !== tagId);
    setJoiner(updatedTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !joiner.includes(value)) {
        const updatedTags = [...joiner, value];
        setJoiner(updatedTags);
        e.currentTarget.value = '';
      } else {
        e.currentTarget.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col text-[20px] font-semibold">
      <span className="mb-2">태그</span>
      <div className="px-4 flex items-center whitespace-nowrap overflow-y-auto scrollbar-hide gap-2 rounded-lg border border-gray-d9 focus-within:border-gray-98">
        {joiner.map((tag, id) => (
          <div key={id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-blue-76 bg-opacity-10">
            <span className="text-[15px] font-medium">{tag}</span>
            <span onClick={() => removeTag(id)} className="flex items-center text-[15px] cursor-pointer">
              <MdOutlineCancel className="text-blue-33 font-semibold" />
            </span>
          </div>
        ))}
        <input
          title="태그"
          type="text"
          placeholder={joiner.length == 0 ? '엔터를 입력하여 태그를 등록해 주세요.' : ''}
          className="py-3 h-[46px] flex-grow rounded-lg text-[14px] font-medium"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default JoinerTagField;
