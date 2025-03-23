"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
    ChevronDownIcon,
    ChevronLeft,
    ChevronRight,
    ChevronUpIcon,
    CircleAlertIcon,
    ListFilterIcon,
    MapIcon,
    Trash2,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    return (
        <div className="space-y-4 mt-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center w-full justify-between gap-3">
                    <div className="relative">
                        <Input
                            ref={inputRef}
                            className={cn(
                                "peer min-w-60 ps-9",
                                Boolean(
                                    table
                                        .getColumn("title")
                                        ?.getFilterValue(),
                                ) && "pe-9",
                            )}
                            value={
                                (table
                                    .getColumn("title")
                                    ?.getFilterValue() ??
                                    "") as string
                            }
                            onChange={(e) =>
                                table
                                    .getColumn("title")
                                    ?.setFilterValue(e.target.value)
                            }
                            placeholder="Lọc theo tên công việc"
                            type="text"
                            aria-label="Lọc theo tên công việc"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <ListFilterIcon
                                size={16}
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-2">
                        {/* Delete Row */}
                        {table.getSelectedRowModel().rows.length >
                            0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className="ml-auto"
                                        variant={"outline"}
                                    >
                                        <Trash2 className="-ms-1 size-4" />
                                        Xóa tất cả
                                        <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                            {
                                                table.getSelectedRowModel()
                                                    .rows.length
                                            }
                                        </span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                                        <div
                                            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                                            aria-hidden="true"
                                        >
                                            <CircleAlertIcon
                                                className="opacity-80"
                                                size={16}
                                            />
                                        </div>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Bạn có chắc chắn muốn
                                                xóa?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Hành động này không
                                                thể hoàn tác. Bạn có
                                                muốn tiếp tục?{" "}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Huỷ
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                        // onClick={handleDeleteRows}
                                        >
                                            Xoá
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <MapIcon /> Xem
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) =>
                                        column.getCanHide(),
                                    )
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(
                                                    value,
                                                ) =>
                                                    column.toggleVisibility(
                                                        !!value,
                                                    )
                                                }
                                            >
                                                {column.id ===
                                                "status"
                                                    ? "Trạng thái"
                                                    : column.id ===
                                                      "priority"
                                                    ? "Độ ưu tiên"
                                                    : column.id ===
                                                      "startDate"
                                                    ? "Ngày bắt đầu"
                                                    : column.id ===
                                                      "dueDate"
                                                    ? "Ngày kết thúc"
                                                    : column.id ===
                                                      "assigneeTo"
                                                    ? "Người thực hiện"
                                                    : null}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="border rounded-md">
                <Table className="table-fixed">
                    <TableHeader>
                        {table
                            .getHeaderGroups()
                            .map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="hover:bg-transparent"
                                >
                                    {headerGroup.headers.map(
                                        (header) => {
                                            return (
                                                <TableHead
                                                    key={header.id}
                                                    style={{
                                                        width: `${header.getSize()}px`,
                                                    }}
                                                    className="h-11"
                                                >
                                                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                        <div
                                                            className={cn(
                                                                header.column.getCanSort() &&
                                                                    "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                                                            )}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            onKeyDown={(
                                                                e,
                                                            ) => {
                                                                // Enhanced keyboard handling for sorting
                                                                if (
                                                                    header.column.getCanSort() &&
                                                                    (e.key ===
                                                                        "Enter" ||
                                                                        e.key ===
                                                                            " ")
                                                                ) {
                                                                    e.preventDefault();
                                                                    header.column.getToggleSortingHandler()?.(
                                                                        e,
                                                                    );
                                                                }
                                                            }}
                                                            tabIndex={
                                                                header.column.getCanSort()
                                                                    ? 0
                                                                    : undefined
                                                            }
                                                        >
                                                            {flexRender(
                                                                header
                                                                    .column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext(),
                                                            )}
                                                            {{
                                                                asc: (
                                                                    <ChevronUpIcon
                                                                        className="shrink-0 opacity-60"
                                                                        size={
                                                                            16
                                                                        }
                                                                        aria-hidden={
                                                                            true
                                                                        }
                                                                    />
                                                                ),
                                                                desc: (
                                                                    <ChevronDownIcon
                                                                        className="shrink-0 opacity-60"
                                                                        size={
                                                                            16
                                                                        }
                                                                        aria-hidden={
                                                                            true
                                                                        }
                                                                    />
                                                                ),
                                                            }[
                                                                header.column.getIsSorted() as string
                                                            ] ?? null}
                                                        </div>
                                                    ) : (
                                                        flexRender(
                                                            header
                                                                .column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )
                                                    )}
                                                </TableHead>
                                            );
                                        },
                                    )}
                                </TableRow>
                            ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row
                                        .getVisibleCells()
                                        .map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column
                                                        .columnDef
                                                        .cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không có kết quả
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 px-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <span>
                        {table.getState().pagination.pageIndex + 1}
                    </span>{" "}
                    of <span>{table.getPageCount()}</span>
                </div>

                <div className="space-x-2">
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
