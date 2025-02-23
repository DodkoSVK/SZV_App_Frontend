interface Props {
    closeUI: () => void;
    changeMonth: (monthIndex: number) => void;
}
const months = [
    { name: "Jan", index: 0 },
    { name: "Feb", index: 1 },
    { name: "Mar", index: 2 },
    { name: "Apr", index: 3 },
    { name: "Maj", index: 4 },
    { name: "Jun", index: 5 },
    { name: "Jul", index: 6 },
    { name: "Aug", index: 7 },
    { name: "Sep", index: 8 },
    { name: "Okt", index: 9 },
    { name: "Nov", index: 10 },
    { name: "Dec", index: 11 },
  ];

const MonthPicker:React.FC<Props> = (props) => {  
    const { closeUI, changeMonth } = props;  
    const handleCellClick = (monthIndex: number) => {
        changeMonth(monthIndex);
        closeUI();
      };
      return (
        <div className="absolute z-30 w-4/6 mt-10 border-2 rounded-md border-gray-300 bg-[#328CC1] text-[#F7F9FB] text-lg font-bold capitalize left-3/6 transform -translate-x-3/6">
          <div className="grid grid-cols-4 gap-2 p-2">
            {months.map(({ name, index }) => (
              <div
                key={index}
                className="text-center hover:text-[#D9B310] cursor-pointer py-2"
                onClick={() => handleCellClick(index)}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      );
};
export default MonthPicker