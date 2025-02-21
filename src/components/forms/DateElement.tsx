import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/sk';
import { useEffect, useState } from "react";

import arrow from "../../assets/arrow-left.svg"

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("sk");

interface Props {
  elementLabel: string
}

const DateElement: React.FC<Props> = (props) => {
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().tz("Europe/Bratislava").year());
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().tz("Europe/Bratislava").month());
  const [monthDays, setMonthDays] = useState<number[]>([]);
  console.log(`Aktualny rok: ${selectedYear}`)
  console.log(`Aktualne dni mesiaca: ${monthDays}`);

  const { elementLabel } = props;

  const splitToWeeks = (days: number[]) => {
    const weeks: number [][] = [];
    for(let i = 0; i < days.length; i+= 7) {
      weeks.push(days.slice(i, i +7));
    }
    return weeks;
  };
  const weeks = splitToWeeks(monthDays);
  console.log(`Tyzdne: ${weeks}`);
  useEffect(() => {
    const dayInMonth = dayjs().year(selectedYear).month(selectedMonth).daysInMonth()
    setMonthDays(Array.from({length: dayInMonth}, (_, i) => i+1));
    
    
  }, [selectedYear, selectedMonth])
  
  return (   
    <div className="relative z-0 w-full mb-5 group">
      <input        
        type="text"
        name="birth"
        id="floating_birth"
        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
        placeholder=" "
        required
    />
      <label
          htmlFor="floating_birth"
          className="flex flex-row peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        <svg 
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
        <p className="pl-2">{ elementLabel }</p>
      </label>
      <div className="relative z-10 w-full my-5 bg-transparent border-2 rounded-lg border-gray-500 group">
        <div className="flex flex-row">
          <div>
            <img src={arrow}/>
          </div>
          <div>
            <p>Februar 2025</p>
          </div>
          <div>
          <img src={arrow} className="rotate-180"/>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 py-2 text-[#F7F9FB] capitalize bg-[#328CC1] ">
              <th>po</th>
              <th>ut</th>
              <th>str</th>
              <th>štr</th>
              <th>pi</th>
              <th>so</th>
              <th>ne</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(weeks) ? (
              weeks.map((week, weekIndex) => (
                <tr key={weekIndex} className="grid grid-cols-7">
                  {week.map((day, dayIndex) => (
                    <td
                    key={dayIndex}
                    className="relative flex justify-center items-center text-[#F7F9FB] text-lg hover:text-black aspect-square"
                  >
                    <span className="absolute inset-0 flex justify-center items-center hover:bg-[#D9B310] hover:rounded-lg">{day}</span>
                  </td>
                  
                  ))}
                  {week.length < 7 && 
                    Array.from({length: 7 - week.length}).map((_, emptyIndex) => (
                      <td key={emptyIndex}></td>
                    ))
                  }
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  Ta neni datum
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DateElement;