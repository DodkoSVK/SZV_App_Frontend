import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table as TableTan } from "@tanstack/react-table";

interface DataTableProps<TData extends { id: number }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] 
    onRowSelect: (ids: number[]) => void;
    tableRef?: React.RefObject<TableTan<TData> | null>;
    columnFilterName: string
}

const DataTable = <TData extends { id: number }, TValue>({ columns, data, onRowSelect, tableRef, columnFilterName}: DataTableProps<TData, TValue>): React.ReactElement => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({})
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),        
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },        
    });
    if (tableRef) {
        tableRef.current = table;
    }

    useEffect(() => {
        const selectedIndexes = Object.keys(rowSelection).map((index) => data[+index]?.id);
        console.log(`Vybrane IDcko: ${selectedIndexes}`);
        onRowSelect(selectedIndexes);
    }, [rowSelection, data, onRowSelect]); 
    
    return (
        <div>
            <div className="flex items-center py-4">
            <Input
                placeholder="Filtrovať kluby..."
                value={(table.getColumn(`${columnFilterName}`)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(`${columnFilterName}`)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <div className="flex-1 text-sm pl-2 text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} z{" "}
                {table.getFilteredRowModel().rows.length} vybraných.
            </div>

            </div>
            <div className="rounded-md border">   
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                            Žiadne výsledky
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
export default DataTable;