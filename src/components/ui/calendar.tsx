import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { DayPicker, CaptionProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { sk } from "date-fns/locale"


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const [month, setMonth] = React.useState(props.month ?? new Date())

  const changeMonth = (diff: number) => {
    const newDate = new Date(month)
    newDate.setMonth(newDate.getMonth() + diff)
    setMonth(newDate)
    props.onMonthChange?.(newDate)
  }

  const changeYear = (diff: number) => {
    const newDate = new Date(month)
    newDate.setFullYear(newDate.getFullYear() + diff)
    setMonth(newDate)
    props.onMonthChange?.(newDate)
  }

  const CustomCaption = (_: CaptionProps) => (
    <div className="flex items-center justify-center gap-2 pt-1">
      {/* Rok dozadu */}
      <button
        type="button"
        onClick={() => changeYear(-1)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <ChevronsLeft className="size-4" />
      </button>

      {/* Mesiac dozadu */}
      <button
        type="button"
        onClick={() => changeMonth(-1)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Text: Mesiac Rok */}
      <span className="min-w-[120px] text-center text-sm font-medium">
        {month.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>

      {/* Mesiac dopredu */}
      <button
        type="button"
        onClick={() => changeMonth(1)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Rok dopredu */}
      <button
        type="button"
        onClick={() => changeYear(1)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <ChevronsRight className="size-4" />
      </button>
    </div>
  )

  return (
    <DayPicker
      locale={sk}
      month={month}
      showOutsideDays={showOutsideDays}
      onMonthChange={setMonth}
      className={cn("p-3", className)}
      components={{
        Caption: CustomCaption,
      }}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
