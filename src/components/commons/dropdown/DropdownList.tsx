import Dropdown from './Dropdown';

interface DropdownListProps {
  data: { name: string; color?: string; id?: string }[];
  handleItemClick: (value: string) => void;
}

const DropdownList = ({ data, handleItemClick }: DropdownListProps) => {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <Dropdown.TextItem onClick={() => handleItemClick(item.id || item.name)}>
            <div className="flex items-center gap-5">
              {item.color ? <span className="w-7 h-7 rounded-full" style={{ backgroundColor: item.color }} /> : null}
              <span className="text-black text-[14px]">{item.name}</span>
            </div>
          </Dropdown.TextItem>
        </div>
      ))}
    </>
  );
};

export default DropdownList;
