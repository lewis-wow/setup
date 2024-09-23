import { db } from '@repo/drizzle';
import {
  count,
  SQL,
  Subquery,
  type ColumnsSelection,
  type TableConfig,
} from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { PgViewBase } from 'drizzle-orm/pg-core/view-base';

type DrizzleSource =
  | SQL<unknown>
  | PgTable<TableConfig>
  | Subquery<string, Record<string, unknown>>
  | PgViewBase<string, boolean, ColumnsSelection>;

export type CreatePaginationEnvelopeArgs<
  TDrizzleSource extends DrizzleSource,
  TData,
> = {
  source: TDrizzleSource;
  data: TData;
};

export const createPaginationEnvelope = async <
  TDrizzleSource extends DrizzleSource,
  TData,
>({
  source,
  data,
}: CreatePaginationEnvelopeArgs<TDrizzleSource, TData>) => {
  const [row] = await db.select({ count: count() }).from(source);

  return {
    data,
    rowCount: row!.count,
  };
};
