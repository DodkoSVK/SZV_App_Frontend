import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isoWeek from "dayjs/plugin/isoWeek";

import 'dayjs/locale/sk';
import { useEffect, useState,useRef, MouseEvent, ChangeEvent } from "react";
//Types
import { SelectingDate, SelectedDate, DayObject } from "../../assets/types/datePicker";
//Children
import MonthPicker from "../dateElement/MonthPicker";
import YearPicker from "../dateElement/YearPicker";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("sk");
dayjs.extend(isoWeek);



interface Props {
  elementLabel: string
  elementValue: string
  setPersonBirth: (date: string) => void


  /* dateValue: string
  elementLabel: string 
  handleSetDate: (date: string) => void; */
}

const DateElement: React.FC<Props> = (props) => {
  const [date, setDate] = useState<string>("");
  const [selectingState, setSelectingState] = useState<SelectingDate>();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: dayjs().tz("Europe/Bratislava").year(),
    month: dayjs().tz("Europe/Bratislava").month(),    
    day: dayjs().tz("Europe/Bratislava").date(),   
  }); 
  const [monthName, setMonthName] = useState<string>();
  const [daysOfMonth, setDaysOfMonth] = useState<DayObject[][]>([]);

  const { elementLabel, elementValue, setPersonBirth } = props
  const dateInput = useRef<HTMLInputElement>(null);
  //Change input value
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDate(e.target.value);     
  }
  const handleDateSelectors = () => {
    setSelectingState({...selectingState, date: true});
  }
  const handleChangeMonth = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    if(id === "prevMonth") {
      const prevMonth = selectedDate.month - 1;
      if( prevMonth < 0 ){
        setSelectedDate({
          ...selectedDate, 
          month: 11,
          year: selectedDate.year-1
        });
      } else {
        setSelectedDate({
          ...selectedDate,
          month: prevMonth
        });
      }      
    }
    else if (id === "nextMonth") {
      const nextMonth = selectedDate.month + 1;
      if ( nextMonth > 11 ) {
        setSelectedDate({
          ...selectedDate,
          month: 0,
          year: selectedDate.year + 1
        });
      } else {
        setSelectedDate({
          ...selectedDate,
          month: nextMonth
        });
      }
    }    
  }
  const handleChangeYear = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    if(id === "prevYear") {      
        setSelectedDate({
          ...selectedDate,
          year: selectedDate.year-1
        });
    } else if (id === "nextYear") {
        setSelectedDate({
          ...selectedDate,
          year: selectedDate.year + 1
        });
    }  
  }
  const handleSelectDay = (day: number) => {
    console.log(`Den: ${day}`);
    if(dateInput.current)
      dateInput.current.value = `${day}.${selectedDate.month + 1}.${selectedDate.year}`;
    setPersonBirth(`${selectedDate.year}.${selectedDate.month + 1}.${day}`)
    setSelectingState({...selectingState, date: false})
  }

  const getMonthDays = (y: number, m: number) => {
    const startOfMonth = dayjs(new Date(y, m, 1));
    const endOfMonth = dayjs(new Date(y, m +1, 0));
    const weeks = [];
  
    let currentWeek = [];
    let currentDate = startOfMonth.startOf('week');
  
    while(currentDate.isBefore(endOfMonth.endOf('week'))) {
      for (let i = 0; i < 7; i++) {
        currentWeek.push({
          day: currentDate.date(),
          isCurrentMonth: currentDate.month() === m
        });
        currentDate = currentDate.add(1, 'day')
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
    setDaysOfMonth(weeks);
  }
  

  useEffect(() => {
    setDate(elementValue)
    if (dateInput.current) dateInput.current.value = date;   
  }, [date]);

  useEffect(() => {
    getMonthDays( selectedDate.year, selectedDate.month );
    setMonthName(dayjs().tz("Europe/Bratislava").month(selectedDate.month).format("MMMM"));
  }, [selectedDate])
  return (
    <div className="relative z-0 w-full mb-5 group capitalize">
      <input               
        ref = { dateInput }
        onChange={handleInputValue}
        onClick={handleDateSelectors}
        type="text"
        name="birth"
        id="floating_birth"
        className="block py-2.5 px-0 w-full text-sm text-[#F7F9FB] bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#D9B310] peer"
        placeholder=" "
        required
      />
      <label
          htmlFor="floating_birth"
          className="flex flex-row gap-2 peer-focus:font-medium absolute text-sm text-[#F7F9FB] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D9B310] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
        { elementLabel }
      </label>

      { selectingState?.date && (
        <div className="relative z-10 w-full my-5 bg-transparent group">       
          
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
          <div className="flex flex-row gap-2 mb-2 font-bold text-gray-50">
            <div className="flex flex-row flex-1 justify-between items-center p-2 rounded-lg  bg-[#328CC1]">
              <div id="prevMonth" onClick={handleChangeMonth} className="ml-5 transition-transform duration-300 hover:text-[#D9B310] hover:scale-150">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fill-rule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div className="hover:text-[#D9B310]">
                <p>{ monthName }</p>
              </div>
              <div id="nextMonth" onClick={handleChangeMonth} className="mr-5 transition-transform duration-300 hover:text-[#D9B310] hover:scale-150">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fill-rule="evenodd" d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z" clip-rule="evenodd" />
                </svg>
              </div>             
            </div>


            <div className="flex flex-row flex-1 justify-between items-center p-2 rounded-lg  bg-[#328CC1]">
              <div id="prevYear" onClick={handleChangeYear} className="ml-5 transition-transform duration-300 hover:text-[#D9B310] hover:scale-150">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fill-rule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div className="hover:text-[#D9B310]">
                <p>{ selectedDate.year }</p>
              </div>
              <div id="nextYear" onClick={handleChangeYear} className="mr-5 transition-transform duration-300 hover:text-[#D9B310] hover:scale-150">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fill-rule="evenodd" d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z" clip-rule="evenodd" />
                </svg>
              </div>             
            </div>                
          </div>          
          <table className="w-full rounded-lg bg-[#328CC1] font-bold">                   
            <tbody>
            {daysOfMonth.length > 0 ? (
                daysOfMonth.map((week, weekIndex) => (
                  <tr key={weekIndex} className="grid grid-cols-7">
                    {week.map((dayObj, dayIndex) => (
                      <td
                        onClick={() => handleSelectDay(dayObj.day)}
                        key={dayIndex}
                        className={`relative flex justify-center items-center text-md aspect-square ${dayObj.isCurrentMonth ? 'text-white' : 'text-gray-400 pointer-events-none'}`}
                      >
                        <span className={`absolute inset-0 flex justify-center items-center m-2 ${dayObj.isCurrentMonth ? 'hover:bg-[#D9B310] hover:text-[#328CC1] hover:rounded-full hover:font-bold' : 'disabled'}`}>{dayObj.day}</span>
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
  /* //useState
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
    }; 
  },[selectedDate])
   */
  /* return (   
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
} */
export default DateElement;