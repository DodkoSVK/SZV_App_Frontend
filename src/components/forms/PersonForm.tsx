// React, Methods
import { useForm } from "react-hook-form";
import { useEffect, useState, MouseEvent, useCallback} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClubs } from "@/apis/ClubApis";
import { ComboboxItem } from "@/assets/types";
// Types
import { CreatePerson, DefaultPerson, EditPerson, Person, defaultPersonSchcema } from "@/assets/types/personTypes";
// Components
import ComboBox from "./ComboBox";

// Utils
import { cn } from "@/lib/utils"
import { format, parse } from "date-fns";
import { da, sk } from "date-fns/locale";
// ShadUi Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";


// Props
interface Props {
    personData?: Person[]; // Array of Person(s) to edit
    handleCloseUI: () => void // Handler close UI event
    onCreate: (person: CreatePerson) => void; // Handler event after click submit button -> Create
    onEdit: (person: EditPerson) => void; // Handler event after click submit button -> Edit
}
// Component
const PersonForm: React.FC<Props> = (props) => {
    // Props
    const { personData, handleCloseUI, onCreate, onEdit } = props;
    // useStates
    const [ localPersonData, setLocalPersonData ] = useState<Person[]>([]); // Save person(s) to component useState
    const [ selectedData, setSelectedData ] = useState<number>(0); // Index for access to localPersonData array to update values
    const [ comboboxClubs, setComboBoxClubs ] = useState<ComboboxItem[]>([]); // Save fetched clubs from DB
    // form
    const form = useForm<DefaultPerson>({
        resolver: zodResolver(defaultPersonSchcema),
        defaultValues: personData?.[selectedData] ?? defaultPersonSchcema.parse({}),
    });
    // variables
    const isEdit = !!localPersonData?.[selectedData]; // Check if exist data on the first index to set editing state
    const submitButtonLabel = isEdit ? "Upraviť" : "Vytvoriť"; 
    const submitButtonVariant = isEdit ? "orange" : "green";
    const submitButtonName = isEdit ? "update" : "create";
    const formTitle = isEdit ? "Upraviť osobu" : "Vytvoriť osobu";
    // Fetch clubs from DB
    const fetchClubs = async () => {
        const clubs = await getClubs();
        if(Array.isArray(clubs) && clubs.length > 0) {
            const formatted = clubs.map(club => ({
                id: club.id,
                name: club.name
            }))
            setComboBoxClubs(formatted);
        } else 
            setComboBoxClubs([])
    }
    // Handler after submit a form -> Create / Edit
    const onSubmit = async (data: DefaultPerson) => {
        if ( data.id === 0 ) {
            console.log(`Vytvaram osobu: ${data}`);
            const createPersonData: CreatePerson = {
                fname: data.fname || "",
                sname: data.sname || "",
                birth: data.birth || new Date("1900-01-01"),
                club_id: data.club_id || 0
            }
            await onCreate?.(createPersonData);
            handleCloseUI();
        } else {
            console.log(`Upravujem klub: ${data}`);
            const editPersonData: EditPerson = {
                id: data.id || localPersonData[selectedData].id,
                fname: data.fname || localPersonData[selectedData].fname,
                sname: data.sname || localPersonData[selectedData].sname,
                birth: data.birth || localPersonData[selectedData].birth,
                club_id: data.club_id || localPersonData[selectedData].club_id
            }
            await onEdit(editPersonData);
            const updatedPersonData = [...localPersonData];
            updatedPersonData.splice(selectedData, 1);
            setLocalPersonData(updatedPersonData);
            console.log(`Updated persons: ${JSON.stringify(updatedPersonData)}`);

            if (updatedPersonData.length > 0) {
                setSelectedData((prev) => Math.min(prev, updatedPersonData.length - 1));
                form.reset(updatedPersonData[Math.min(selectedData, updatedPersonData.length - 1 )]);
            } else {
                handleCloseUI();
            }
        }
    }
    // Handler after click exit button
    const handleCancelButton = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        console.log("Ruším vytvorenie klubu");
        handleCloseUI();
    }, [handleCloseUI]);
    // Add event listener to esc keyboard
    useEffect(() => {
        fetchClubs();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCancelButton(event as unknown as MouseEvent<HTMLButtonElement>);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleCancelButton]);
    // Resetting form after change data in selectedData, clubData and form
    useEffect(() => {
        if (personData && personData[selectedData]) {
          const selected = personData[selectedData];
          if (selected.birth && typeof selected.birth === "string") {
            selected.birth = parse(selected.birth, "dd.MM.yyyy", new Date());
          }      
          form.reset(selected);
        }
      }, [selectedData, personData, form]);

    // save coming club data to component useState
    useEffect(() => {        
        setLocalPersonData(personData ?? []);
    }, [personData]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-xs">
            <Card className="w-full max-w-md">
                <CardHeader>{formTitle}</CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meno</FormLabel>
                                        <FormControl>
                                            <Input {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="sname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priezvisko</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Dátum narodenia</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                typeof field.value === "string"
                                                                ? parse(field.value, "dd.MM.yyyy", new Date())
                                                                : field.value,
                                                                "d. M. yyyy",
                                                                { locale: sk }
                                                            )
                                                            ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date("1900-01-01")}
                                                    initialFocus
                                                />
                                                </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="club_id"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Klub</FormLabel>
                                        <FormControl>
                                            <ComboBox
                                                label="Vyberte klub"
                                                notFoundText="Nenašiel sa žiadny klub"
                                                items={comboboxClubs}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-row items-center justify-center gap-4">
                                <Button
                                    variant={submitButtonVariant}
                                    type="submit"
                                    name={submitButtonName}
                                > 
                                    {submitButtonLabel}
                                </Button>
                                <Button
                                    variant="red"
                                    name="cancel"
                                    onClick={handleCancelButton}
                                >
                                    Zrušiť
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                { localPersonData && localPersonData.length > 1 && (
                    <CardFooter>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            setSelectedData((prev) => Math.max(prev - 1, 0))
                                        }
                                        label="Späť"
                                        className="hover:!bg-primary"
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <div className="px-3 py-1 text-sm">
                                        {selectedData + 1} / {localPersonData.length}
                                    </div>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            setSelectedData((prev) =>
                                            Math.min(prev + 1, localPersonData.length - 1)
                                            )
                                        }
                                        label="Ďalej"
                                        className="hover:!bg-primary"
                                    />
                                </PaginationItem>                                
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                )}  
            </Card>
        </div>
    );
};
export default PersonForm;