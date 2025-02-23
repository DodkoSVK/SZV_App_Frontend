import { useState } from "react";

interface Props {
  actualYear: number;
  closeUI: () => void;
  changeYear: (year: number) => void;
}

const YearPicker: React.FC<Props> = ({ actualYear, closeUI, changeYear }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const startYear = 1950;
  const endYear = new Date().getFullYear() + 5;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).reverse(); // Najnovšie roky hore

  const handleSelect = (year: number) => {
    changeYear(year);
    setIsOpen(false);
    closeUI();
  };

  return (
    <div className="absolute z-30 mt-10 border-2 rounded-md border-gray-300 bg-[#328CC1] text-[#F7F9FB] text-lg font-bold left-3/6 transform -translate-x-3/6 ">
      <div
        className="flex flex-row justify-between items-center px-4 py-1 gap-4 cursor-pointer hover:bg-[#D9B310] "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{actualYear}</span>
        <svg
          className={`text-[#F7F9FB] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          stroke="currentColor"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
        </svg>
      </div>      
      <div
        className={`overflow-hidden transition-all duration-300 ease-out transform ${
          isOpen ? "max-h-60 scale-y-100 opacity-100" : "max-h-0 scale-y-0 opacity-0"
        } origin-top`}
      >
        <div className="bg-[#328CC1] border-t-2 border-gray-300 max-h-60 overflow-y-auto">
          {years.map((year) => (
            <p
              key={year}
              className={`px-4 py-1 cursor-pointer transition ${year === actualYear ? "bg-[#D9B310]" : "hover:bg-[#D9B310]"}`}
              onClick={() => handleSelect(year)}
            >
              {year}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearPicker;
