import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpIcon } from "lucide-react";
import { Club } from "@/assets/types/clubTypes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const ClubTableColumns: ColumnDef<Club>[] = [
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
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Klub
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>                
            )
        },
    },
    {
        id: "address",
        accessorFn: (row) => `${row.city}, ${row.street}, ${row.postal}`,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sídlo
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "ico",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    IČO
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "mail",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    E-mail
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "tel",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tel
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "chairman",
        accessorFn: (row) => `${row.fname} ${row.sname}`,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Štatutár
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    }
]
export default ClubTableColumns;