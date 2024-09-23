import { Options, parseAsInteger, useQueryState } from 'nuqs';

export type UseQueryStatePaginationProps = {
  pageSize?: number;
};

export type PaginationState = {
  pageSize: number;
  pageIndex: number;
};

export type UseQueryStatePaginationPayload = PaginationState & {
  setPageIndex: <Shallow>(
    value: number | ((old: number) => number | null) | null,
    options?: Options<Shallow> | undefined,
  ) => Promise<URLSearchParams>;
};

export const defaultPaginationPageSize = 10;

export const useQueryStatePagination = (
  props?: UseQueryStatePaginationProps,
): UseQueryStatePaginationPayload => {
  const [pageIndex, setPageIndex] = useQueryState(
    'page',
    parseAsInteger.withDefault(0),
  );

  return {
    pageIndex,
    pageSize: props?.pageSize ?? defaultPaginationPageSize,
    setPageIndex,
  };
};
