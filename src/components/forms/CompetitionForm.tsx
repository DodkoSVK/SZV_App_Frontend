import { ComboboxItem } from "@/assets/types";
import { Competition, DefaultCompetition, defaultCompetitionSchema, CreateCompetition, EditCompetition } from "@/assets/types/competitionTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, MouseEvent, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getClubs } from "@/apis/ClubApis";
// Utils
import { cn } from "@/lib/utils"
import { format, parse } from "date-fns";
import { sk } from "date-fns/locale";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import ComboBox from "./ComboBox";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { getLeagues } from "@/apis/leagueApis";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";;
interface Props {
    competitionData?: Competition[]; //Array of Competition(s) to edit
    handleCloseUI: () => void; // Handler close UI event
    onCreate: (competition: CreateCompetition) => void; // Handler event after click a submit button -> Create
    onEdit: (competition: EditCompetition) => void; // Handler event after click a submit button -> Edit
}

const CompetitionForm: React.FC<Props> = (props) => {
    // Props
    const { competitionData, handleCloseUI, onCreate, onEdit } = props;
    // useStates
    const [ localCompetitionData, setLocalCompetitionData ] = useState<Competition[]>([]); // Save competition(s) to component´s useState
    const [ selectedData, setSelectedData ] = useState<number>(0); // Index for access to localCompetitionData array to update values
    const [ comboboxClubs, setComboBoxClubs ] = useState<ComboboxItem[]>([]); // Save fetched clubs from DB
    const [ ComboBoxLeagues, setComboBoxLeagues] = useState<ComboboxItem[]>([]); // Save fetched leagues from DB
    const [ clubsCity, setClubsCity ] = useState<{id: number, city: string}[]>(); // Save Club(s) ID and City
    // Form
    const form = useForm<DefaultCompetition>({
        resolver: zodResolver(defaultCompetitionSchema),
        defaultValues: localCompetitionData[selectedData]
            ? localCompetitionData[selectedData]
            : defaultCompetitionSchema.parse({}),
    });

    
    const { fields, append,} = useFieldArray({
        control: form.control,
        name: "locations",
    });
    const watchedLocations = form.watch("locations");
    // variables
    const isEdit = !!localCompetitionData?.[selectedData]; // Check if exist data on the first index to set editing state
    const submitButtonLabel = isEdit ? "Upraviť" : "Vytvoriť"; 
    const submitButtonVariant = isEdit ? "orange" : "green";
    const submitButtonName = isEdit ? "update" : "create";
    const formTitle = isEdit ? "Upraviť súťaž" : "Vytvoriť súťaž";
    // Fetch clubs from DB
    const fetchClubs = async () => {
        const clubs = await getClubs();
        if(Array.isArray(clubs) && clubs.length > 0) {
            const formatted = clubs.map(club => ({
                id: club.id,
                name: club.name
            }));
            const formattedClubs = clubs.map(club => ({
                id: club.id,
                city: club.city
            }));
            
            setComboBoxClubs(formatted);
            setClubsCity(formattedClubs);
        } else {
            setComboBoxClubs([]);
            setClubsCity([]);
        }
            
    }
    //Fetch leagues from DB
    const fetchLeagues = async () => {
        const leagues = await getLeagues();
        if(Array.isArray(leagues) && leagues.length > 0) {
            const formatted = leagues.map(league => ({
                id: league.id,
                name: league.name
            }));
            setComboBoxLeagues(formatted);
        } else 
            setComboBoxClubs([]);
    }
    // Handler after click exit button
    const handleCancelButton = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        console.log("Ruším vytvorenie klubu");
        handleCloseUI();
    }, [handleCloseUI]);

    //Add new location to competition
    const handleAddLocation = () => {
        const currentLocations = form.getValues("locations") ?? [];
    
        const lastId = currentLocations.reduce(
            (max, loc) => (typeof loc?.id === "number" ? Math.max(max, loc.id) : max),
            0
        );
    
        const newId = lastId + 1;
    
        console.log(`🟢 Pridávam lokalitu s ID: ${newId}`);
    
        append({
            id: newId,
            group: "",
            city: "",
            club_id: 0,
            club_name: "",
        });
    };
    

    // Handler after a submit a form -> Create / Edit
    const onSubmit = async (data: DefaultCompetition) => {
        console.log(`Data z formu: ${JSON.stringify(data)}`)
        if ( !data.id ) {
            console.log(`Vyvaram sutaz: ${data}`);
            const createCompetitionData: CreateCompetition = {
                league_id: data.league_id ?? 0,
                round: data.round ?? 0,
                date: data.date ?? new Date("1900-01-01"),
                locations: (data.locations ?? []).map((location) => ({
                    group: location.group ?? "",
                    city: location.city && location.city !== "" ? location.city : clubsCity?.find(({ id }) => id === location.club_id)?.city ?? "",
                    club_id: location.club_id ?? 0,
                })),
            }
            console.log(`Vytvaram sutaz ${JSON.stringify(createCompetitionData)}`);
            await onCreate?.(createCompetitionData);
            handleCloseUI();            
        } else {
            console.log(`Upravujem sutaz: ${data}`);
            const actualCompetitions = localCompetitionData[selectedData]
            const editCompetition: EditCompetition = {
                id: data.id,
                league_id: data.league_id ?? actualCompetitions.league_id,
                round: data.round ?? actualCompetitions.round,
                date: data.date ?? actualCompetitions.date,
                locations: (data.locations ?? []).map((location) => ({
                    id: location.id,
                    group: location.group ?? "",
                    city: location.city && location.city !== "" ? location.city : clubsCity?.find(({ id }) => id === location.club_id)?.city ?? "",
                    club_id: location.club_id ?? 0
                })),
            }
            await onEdit(editCompetition);
            const updatedCompetitionData = [...localCompetitionData];
            updatedCompetitionData.splice(selectedData, 1);
            setLocalCompetitionData(updatedCompetitionData);
            console.log(`Updated competitions: ${JSON.stringify(updatedCompetitionData)}`);
            
            if (updatedCompetitionData.length > 0) {
                setSelectedData((prev) => Math.min(prev, updatedCompetitionData.length - 1));
                form.reset(updatedCompetitionData[Math.min(selectedData, updatedCompetitionData.length - 1)])
            } else {
                handleCloseUI();
            }
        }
    }

    // Fetch clubs and leagues from DB
    useEffect(() => {
        fetchClubs();
        fetchLeagues();
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
    // Save coming Competition data do component useState
    useEffect(() => {
        setLocalCompetitionData(competitionData ?? []);
    }, [competitionData]);    
    // Checking changing localCompetitionData and Selected data and re-render form
    useEffect(() => {
        if (localCompetitionData.length > 0) {
            const selected = localCompetitionData[selectedData];
            form.reset({
            ...selected,
            date: parse(selected.date, "dd/MM/yyyy", new Date()),
        });
        }
    }, [localCompetitionData, selectedData]);
    


    useEffect(() => {
        const subscription = form.watch((value, { name, type }) => {
            console.log(`🟡 Zmena vo forme [${name} - ${type}]:`, value);
        });
        return () => subscription.unsubscribe();
    }, [form]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-xs">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{formTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="league_id"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Liga</FormLabel>
                                        <FormControl>
                                            <ComboBox 
                                                label="Vyberte ligu"
                                                notFoundText="Nenašla sa žiadna liga"
                                                items={ComboBoxLeagues}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="round"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kolo</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Dátum súťaže</FormLabel>
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
                                                            <span>Vyber dátum</span>
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
                                                    disabled={(date) => date < new Date("2025-01-01")}
                                                    initialFocus
                                                />
                                                </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />
                            
                            <div className="flex flex-row items-center justify-around pb-1 pl-2 border-b-2 border-foreground border-solid">
                                <CardTitle>
                                    Skupiny
                                </CardTitle>
                                <button 
                                    type="button"
                                    onClick={handleAddLocation}
                                    className="flex flex-row text-chart-2 gap-2 cursor-pointer transform transition-transform hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>Pridať</span>
                                </button>                                  
                            </div> 
                            
                            {fields.length > 0 ? (
                                <div
                                    className="max-h-[500px] overflow-y-auto"
                                    style={{ gridAutoRows: "min-content" }}
                                >
                                    {fields.map((field, index) => (
                                    <Card key={field.id} className="w-full mb-4">
                                        <CardHeader>
                                        <CardTitle>{`Skupina ${index + 1} - ${watchedLocations?.[index]?.group || ""}`}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name={`locations.${index}.group`}
                                            render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Názov skupiny</FormLabel>
                                                <FormControl>
                                                <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`locations.${index}.club_id`}
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
                                        <FormField
                                            control={form.control}
                                            name={`locations.${index}.city`}
                                            render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Miesto konania</FormLabel>
                                                <FormControl>
                                                <Input {...field} />
                                                </FormControl>
                                                <FormDescription>Ak je iné ako sídlo klubu</FormDescription>
                                            </FormItem>
                                            )}
                                        />
                                        </CardContent>
                                    </Card>
                                    ))}
                                </div>
                                ) : (
                                <p className="text-center text-foreground">Žiadne skupiny</p>
                                )}

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
                { localCompetitionData && localCompetitionData.length > 1 && (
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
                                        {selectedData + 1} / {localCompetitionData.length}
                                    </div>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            setSelectedData((prev) =>
                                            Math.min(prev + 1, localCompetitionData.length - 1)
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
}
export default CompetitionForm