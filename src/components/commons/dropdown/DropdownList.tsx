import Dropdown from './Dropdown';

interface DropdownListProps {
  data: string[];
  handleItemClick: (value: string) => void;
}

const DropdownList = ({ data, handleItemClick }: DropdownListProps) => {
  return Object.entries(data).map(([index, value]) => (
    <div key={index}>
      <Dropdown.TextItem key={`${index}-${value}`} onClick={() => handleItemClick(value)}>
        {value}
      </Dropdown.TextItem>
    </div>
  ));
};

export default DropdownList;
