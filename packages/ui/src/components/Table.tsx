'use client';

import { Button } from '@/components/ui/button';
import {
  Table as ReactTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { UseQueryStatePaginationPayload } from '@/hooks/useQueryStatePagination';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

type TableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: UseQueryStatePaginationPayload & { rowCount: number };
};

export const Table = <TData, TValue>({
  columns,
  data,
  pagination,
}: TableProps<TData, TValue>) => {
  const t = useTranslations();
  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    rowCount: pagination?.rowCount,
    onPaginationChange: (setPagination) => {
      if (pagination === undefined) return;

      const nextPaginationState =
        typeof setPagination === 'function'
          ? setPagination(pagination)
          : setPagination;

      pagination.setPageIndex(nextPaginationState.pageIndex);
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <ReactTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
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
                  {t('components.Table.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ReactTable>
      </div>
      {pagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t('components.Table.previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('components.Table.next')}
          </Button>
        </div>
      )}
    </div>
  );
};
