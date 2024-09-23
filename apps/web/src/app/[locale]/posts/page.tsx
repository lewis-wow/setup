'use client';

import { trpc, type AppRouterOutput } from '@repo/trpc/trpcReactClient';
import { Table } from '@repo/ui/components/Table';
import { useQueryStatePagination } from '@repo/ui/hooks/useQueryStatePagination';
import { keepPreviousData } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

const PostsPage = () => {
  const pagination = useQueryStatePagination();

  const postsQuery = trpc.post.list.useQuery(
    {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    {
      placeholderData: keepPreviousData,
    },
  );

  const columns: ColumnDef<AppRouterOutput['post']['list']['data'][number]>[] =
    useMemo(
      () => [
        {
          accessorKey: 'id',
          header: () => <span>ID</span>,
        },
        {
          accessorKey: 'title',
          header: () => <span>Title</span>,
        },
      ],
      [],
    );

  if (postsQuery.isLoading) return <p>Loading...</p>;

  return (
    <main>
      <Table
        data={postsQuery.data!.data}
        pagination={{ ...pagination, rowCount: postsQuery.data!.rowCount }}
        columns={columns}
      ></Table>
    </main>
  );
};

export default PostsPage;
