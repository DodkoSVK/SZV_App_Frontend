import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ComboboxItem } from "@/assets/types"

interface Props {
  label: string
  notFoundText: string
  items: ComboboxItem[]
  value?: string | number
  onChange?: (value: number) => void
}

const ComboBox: React.FC<Props> = ({
  label,
  notFoundText,
  items,
  value,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false)

  const selectedItem = items.find((item) => item.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {selectedItem ? selectedItem.name : `${label}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder={`${label}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onChange?.(item.id) // prepojenie s RHF
                    setOpen(false)
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBox
