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
}

const ComboBox: React.FC<Props> = (props) => {
    const { label, notFoundText, items } = props;
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<string | number>(0);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
                >
                {value
                    ? items.find((item) => item.id === value)?.name
                    : `${label}...`}
                <ChevronsUpDown className="opacity-50" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={`${label}...`} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{notFoundText}</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? 0 : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {item.name}
                                    <Check
                                        className={cn(
                                        "ml-auto",
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
    );
}
export default ComboBox;