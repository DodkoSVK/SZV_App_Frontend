import { ColumnDef } from "@tanstack/react-table"
import { Club } from "@/assets/types/clubTypes";

const ClubTableColumns: ColumnDef<Club>[] = [
    {
        accessorKey: "name",
        header: "Klub"
    },
    {
        accessorFn: (row) => `${row.city}, ${row.street}, ${row.postal}`,
        header: "Sídlo"
    },
    {
        accessorKey: "ico",
        header: "IČO"
    },
    {
        accessorKey: "mail",
        header: "E-Mail"
    },
    {
        accessorKey: "tel",
        header: "Tel"
    },
    {
        accessorFn: (row) => `${row.fname} ${row.sname}`,
        header: "Štatutár"
    }
]
export default ClubTableColumns;