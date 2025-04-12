import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
//Form components
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react";
//Schemas
import { createClubSchema } from "@/assets/types/clubTypes";
import { data } from "react-router-dom";
type CreateClub = z.infer<typeof createClubSchema>;

const ClubForm: React.FC = () => {
    const form = useForm<CreateClub>({
        resolver: zodResolver(createClubSchema),
        defaultValues: {
            name: "",
            city: "",
            street: "",
            postal: "",
            ico: "",
            tel: "",
            mail: ""
        },
    });
    const onSubmit = (data: CreateClub) => {
        console.log(`Vyvaram klub: ${data}`);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel>Názov klubu</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormDescription>
                                Ta popis
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Vytvoriť</Button>
            </form>
        </Form>
    )
};
export default ClubForm

