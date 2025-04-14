import { useForm } from "react-hook-form";
import { useEffect, useState, MouseEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
//Form components
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
import ComboBox from "./ComboBox";
//Schemas
import { createClubSchema } from "@/assets/types/clubTypes";
//Methods
import { getPersons } from "@/apis/PersonApis";
import { ComboboxItem } from "@/assets/types";

type CreateClub = z.infer<typeof createClubSchema>;

interface Props {
    formTitle: string
    clubData?: CreateClub[]
    handleCloseUI: () => void
    onCreate?: (club: CreateClub) => void;
    onEdit?: (club: CreateClub) => void;
}

const ClubForm: React.FC<Props> = (props) => {
    const { formTitle, clubData, handleCloseUI, onCreate, onEdit} = props;
    const [ selectedData, setSelectedData ] = useState<number>(0);
    const [ localClubData, setLocalClubData ] = useState<CreateClub[]>([]);
    const [comboboxPeople, setComboBoxPeople] = useState<ComboboxItem[]>([]);
    const form = useForm<CreateClub>({
        resolver: zodResolver(createClubSchema),
        defaultValues: clubData?.[selectedData] || {
            id: 0,
            name: "",
            city: "",
            street: "",
            postal: "",
            ico: "",
            tel: "",
            mail: "",
            chairman: 0
        },
    });
    const isEdit = (clubData?.[selectedData]?.id ?? 0) > 0;
    const submitButtonLabel = isEdit ? "Upraviť" : "Vytvoriť";
    const submitButtonVariant = isEdit ? "orange" : "green";

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
    const onSubmit = async (data: CreateClub) => {
        if (localClubData.length > 0) {
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
        } else {
            console.log(`Vytváram klub:`, data);
            onCreate?.(data);
            handleCloseUI();
        }
    };


    const handleCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        console.log("Ruším vytvorenie klubu");
        handleCloseUI();
    };

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
    }, []);

    useEffect(() => {
        if (clubData && clubData[selectedData]) {
            form.reset(clubData[selectedData]);
        }
    }, [selectedData, clubData]);

    useEffect(() => {
        setLocalClubData(clubData ?? []);
    }, [clubData])
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
                                >
                                    {submitButtonLabel}
                                </Button> 
                                <Button
                                    variant="red"
                                    onClick={handleCloseUI}
                                >
                                    Zrušiť
                                </Button>
                            </div>                   
                        </form>
                    </Form>
                </CardContent> 
                { clubData && clubData.length > 0 && (
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

