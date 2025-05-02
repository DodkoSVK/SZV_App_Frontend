import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Person } from "@/assets/types/personTypes";
import { Button } from "@/components/ui/button";

const PersonTableColumns: ColumnDef<Person>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || 
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Označiť všetko"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Označiť"
            />
        )
    },
    {
        accessorKey: "fname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Meno
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>    
            )
        },
    },
    {
        accessorKey: "sname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Meno
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>    
            )
        },
    },
    {
        accessorKey: "birth",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Meno
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>    
            )
        },
    },
    {
        accessorKey: "club",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Meno
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>    
            )
        },
    },
]

export default PersonTableColumns;