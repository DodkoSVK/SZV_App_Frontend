// React, Methods
import { useForm } from "react-hook-form";
import { useEffect, useState, MouseEvent, useCallback} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPersons } from "@/apis/PersonApis";
import { ComboboxItem } from "@/assets/types";
// Types
import { CreateClub, EditClub, defaultableClubSchema, DefaultClub, Club} from "@/assets/types/clubTypes";
// Components
import ComboBox from "./ComboBox";
// ShadUi Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Props
interface Props {
    clubData?: Club[]; // Array of Club(s) to edit
    handleCloseUI: () => void // Handler close UI event
    onCreate?: (club: CreateClub) => void; // Handle event after click submit button -> Create
    onEdit?: (club: EditClub) => void; // Handler event after click submit button -> Edit
}
// Component
const ClubForm: React.FC<Props> = (props) => {
    // Props
    const { clubData, handleCloseUI, onCreate, onEdit } = props;
    // useStates
    const [ localClubData, setLocalClubData ] = useState<Club[]>([]); // Save club(s) to edit in local useState 
    const [ selectedData, setSelectedData ] = useState<number>(0); // Index for access to localClubData array to update values
    const [ comboboxPeople, setComboBoxPeople ] = useState<ComboboxItem[]>([]); // Save fetched people from DB
    // form
    const form = useForm<DefaultClub>({
        resolver: zodResolver(defaultableClubSchema),
        defaultValues: clubData?.[selectedData] ?? defaultableClubSchema.parse({}),
    });
    // variables
    const isEdit = !!localClubData?.[selectedData]; // Check if exist data on the first index to set editing state
    const submitButtonLabel = isEdit ? "Upraviť" : "Vytvoriť"; 
    const submitButtonVariant = isEdit ? "orange" : "green";
    const submitButtonName = isEdit ? "update" : "create";
    const formTitle = isEdit ? "Upraviť klub" : "Vytvoriť klub";
    // Fetch persons from DB 
    const fetchPersons = async () => {
        const people = await getPersons();
        if(Array.isArray(people) && people.length > 0) {
            const formatted = people.map(person => ({
                id: person.id,
                name: `${person.fname} ${person.sname}`
            }))
            setComboBoxPeople(formatted);
        } else 
            setComboBoxPeople([])       
    }
    // Handler after submit a form -> Create / Edit
    const onSubmit = async (data: DefaultClub) => {
        if( data.id === 0 ) {
            console.log(`Vytváram klub:`, data);
            const createClubData: CreateClub = {
                name: data?.name || "",
                city: data?.city || "",
                street: data?.street || "",
                postal: data?.postal || "",
                ico: data?.ico || "",
                tel: data.tel,
                mail: data.mail,
                chairman: data?.chairman || 0
            };
            await onCreate?.(createClubData);
            handleCloseUI();
        } else {
            console.log(`Upravujem klub:`, data);
            await onEdit?.(data);
            const updatedClubData = [...localClubData];
            updatedClubData.splice(selectedData, 1);
            setLocalClubData(updatedClubData);
            console.log(`Updated clubs: ${JSON.stringify(updatedClubData)}`);
        
            if (updatedClubData.length > 0) {
                setSelectedData((prev) => Math.min(prev, updatedClubData.length - 1));
                form.reset(updatedClubData[Math.min(selectedData, updatedClubData.length - 1)]);
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
        fetchPersons();
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
        if (clubData && clubData[selectedData]) {
            form.reset(clubData[selectedData]);
        }
    }, [selectedData, clubData, form]);

    // save coming club data to component useState
    useEffect(() => {        
        setLocalClubData(clubData ?? []);
    }, [clubData]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-xs">       
            <Card className="w-full max-w-md">
                <CardHeader className="text-2xl">
                    <CardTitle>{formTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field}) => (
                                    <FormItem>
                                        <FormLabel>Názov klubu</FormLabel>
                                        <FormControl>
                                            <Input {...field}/>
                                        </FormControl>                                    
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ulica</FormLabel>
                                        <FormControl>
                                            <Input {...field}/>
                                        </FormControl>                                    
                                        <FormMessage />
                                    </FormItem>
                                )}
                                
                            />

                            <div className="flex flex-row gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Mesto</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>                                    
                                            <FormMessage />
                                        </FormItem>
                                    )}                            
                                />

                                <FormField
                                    control={form.control}
                                    name="postal"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>PSČ</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>                                    
                                            <FormMessage />
                                        </FormItem>
                                    )}                            
                                />
                            </div>
                            <div className="flex flex-row gap-4">
                                <FormField
                                    control={form.control}
                                    name="ico"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>IČO</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>                                    
                                            <FormMessage />
                                        </FormItem>
                                    )}                            
                                />

                                <FormField
                                    control={form.control}
                                    name="tel"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Tel</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>                                    
                                            <FormMessage />
                                        </FormItem>
                                    )}                            
                                />
                            </div>
                            <FormField
                                    control={form.control}
                                    name="mail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input {...field}/>
                                            </FormControl>                                    
                                            <FormMessage />
                                        </FormItem>
                                    )}                            
                            />

                            <FormField
                                control={form.control}
                                name="chairman"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Štatutár</FormLabel>
                                        <FormControl>
                                            <ComboBox                                            
                                                label="Vyberte osobu"
                                                notFoundText="Nenašla sa žiadna osoba"
                                                items={comboboxPeople}
                                                {...field}
                                            />                                        
                                        </FormControl>                                    
                                        <FormMessage />
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
                { localClubData && localClubData.length > 0 && (
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
                                        {selectedData + 1} / {localClubData.length}
                                    </div>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            setSelectedData((prev) =>
                                            Math.min(prev + 1, localClubData.length - 1)
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
    )
};
export default ClubForm

