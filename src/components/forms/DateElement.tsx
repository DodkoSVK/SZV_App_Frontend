import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/sk';
import { useEffect, useState,useRef, MouseEvent } from "react";
//Types
import { SelectingDate, SelectedDate, DateInformation } from "../../assets/types/datePicker";
//Children
import MonthPicker from "../dateElement/MonthPicker";
import YearPicker from "../dateElement/YearPicker";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("sk");

interface Props {
  dateValue: string
  elementLabel: string 
  handleSetDate: (date: string) => void;
}

const DateElement: React.FC<Props> = (props) => {
  //useState
  const [selectingState, setSelectingState] = useState<SelectingDate>();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: dayjs().tz("Europe/Bratislava").year(),
    month: dayjs().tz("Europe/Bratislava").month(),    
    day: dayjs().tz("Europe/Bratislava").date(),   
  }); 
  const [dateInfo, setDateInfo] = useState<DateInformation | null>(null);  
  //useRef
  const dateInput = useRef<HTMLInputElement>(null);
  const calendar = useRef<HTMLDivElement>(null);
  //Props
  const { dateValue, elementLabel, handleSetDate } = props;  

  const splitToWeeks = (days: number[]) => {
    const weeks: number [][] = [];
    for(let i = 0; i < days.length; i+= 7) {
      weeks.push(days.slice(i, i +7));
    }
    return weeks;
  }; 
  const handleDateInputValue = (date: string) => {
    if(dateInput.current)
      dateInput.current.value = date
  }
  const handleMonthChange = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const elementId = e.currentTarget.id;  
    if (elementId === "previousMonth") {
      if (selectedDate.month === 0) {
        setSelectedDate({ 
          ...selectedDate, 
          year: selectedDate.year - 1,
          month: 11
        });       
      } else {
        setSelectedDate({ ...selectedDate, month: selectedDate.month - 1});
      }
    } else if (elementId === "nextMonth") {
      if (selectedDate.month === 11) {
        setSelectedDate({
          ...selectedDate,
          year: selectedDate.year + 1,
          month: 0
        });        
      } else {
        setSelectedDate({ ...selectedDate, month: selectedDate.month + 1});
      }
    } else if (elementId === "monthList") {
      e.stopPropagation();
      setSelectingState({ ...selectingState, month: true, year: false});
    }
  };
  const handleYearChange = () => {    
    setSelectingState({ ...selectingState, year: true, month: false});
  }
  const handleSelectDay = (selectedDay: number) => {
    setSelectedDate({...selectedDate, day: selectedDay });
    setSelectingState({date: false}); 
    const date = `${selectedDate.year}.${selectedDate.month+1}.${selectedDate.day}`; 
    handleDateInputValue(date);
    handleSetDate(date);
  }
  
  useEffect(() => {
    const firstDayOfMonth = dayjs().year(selectedDate.year).month(selectedDate.month).startOf("month").day();  
    const dayInMonth = dayjs().year(selectedDate.year).month(selectedDate.month).daysInMonth();    
    const emptyDays = Array(firstDayOfMonth).fill(null);
    const daysArray = [...emptyDays, ...Array.from({ length: dayInMonth }, (_, i) => i + 1)];     
    setDateInfo({
      ...dateInfo, 
      monthName: dayjs().tz("Europe/Bratislava").month(selectedDate.month).format("MMMM"),
      totalDays: daysArray,
      weeks: splitToWeeks(daysArray)
    })
      

    /* const handleCalendarHide = (e: Event) => {
      if(calendar.current && !calendar.current.contains(e.target as Node)) {
        setSelectingState({date: false});
      }
    };

    document.addEventListener("mousedown", handleCalendarHide);
    return () => {
      document.addEventListener("mousedown", handleCalendarHide);
    }; */
  },[selectedDate])
  
  return (   
    <div className="relative z-0 w-full mb-5 group capitalize">
      <input       
        ref = { dateInput }
        onClick={() => setSelectingState({date: true})}
        value={ dateValue }
        onChange={(e) => handleSetDate(e.target.value)}
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
      { selectingState?.date && (
        <div className="relative z-10 w-full my-5 bg-transparent border-2 rounded-lg border-gray-500 group">       
          {/** Month select */}
          { selectingState.month && (
            <MonthPicker 
              closeUI={() => setSelectingState({ ...selectingState, month: false})}
              changeMonth={(monthIndex: number) => setSelectedDate({...selectedDate, month: monthIndex})}
            />
          )}        
          { selectingState.year && (
            <YearPicker               
              actualYear={selectedDate.year}
              closeUI={() => setSelectingState({ ...selectingState, year: false})}
              changeYear={(year: number) => setSelectedDate({ ...selectedDate, year: year})}
            />
          )}
          {/**Calendar */}
          <div className="flex flex-row justify-center items-center text-[#F7F9FB] capitalize bg-[#328CC1] rounded-t-md">
            <div 
              id="previousMonth"              
              onClick={handleMonthChange}
              className="w-10 h-10 hover:text-[#D9B310] hover:font-bold">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex mx-15 text-xl font-bold gap-2">
              <p
                id="monthList"
                className="hover:text-[#D9B310]"
                onClick={handleMonthChange}
              >{dateInfo?.monthName}</p>
              <p
                className="hover:text-[#D9B310]"
                onClick={handleYearChange}
              >{selectedDate.year}</p>
            </div>
            <div 
              id="nextMonth"
              ref={calendar} 
              onClick={handleMonthChange}
              className="rotate-180 w-10 h-10 hover:text-[#D9B310] hover:font-bold">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M4 12L8 8M4 12L8 16" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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


            {/**Continue day picker */}
            <tbody>
              {Array.isArray(dateInfo?.weeks) ? (
                dateInfo?.weeks.map((week, weekIndex) => (
                  <tr key={weekIndex} className="grid grid-cols-7">
                    {week.map((day, dayIndex) => (
                      <td
                        key={dayIndex}
                        className="relative flex justify-center items-center text-[#F7F9FB] text-lg hover:text-black aspect-square"
                        onClick={() => {                          
                          handleSelectDay(day);
                        }}
                      >
                        {day !== null ? (
                          <span className="absolute inset-0 flex justify-center items-center hover:bg-[#D9B310] hover:rounded-lg hover:font-bold">{day}</span>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>Ta neni datum</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}      
    </div>
  );
}
export default DateElement;