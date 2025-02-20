import { Stack, StackProps } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import Loading from "components/feedback/Loading";
import { FC, ReactNode, useEffect, useRef } from "react";
import Infinite from "react-infinite-scroll-component";
import { Pagination } from "types/api";

type Props = {
  loader?: ReactNode;
  children: ReactNode;
  query: UseInfiniteQueryResult<
    {
      data: Pagination<unknown>;
      pageParam: any;
    },
    unknown
  >;
} & StackProps;
const InfiniteScroll: FC<Props> = ({ query, children, loader, ...props }) => {
  const { fetchNextPage, hasNextPage, data, isSuccess } = query;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.innerHeight > (ref.current?.scrollHeight ?? 0)) {
      query.fetchNextPage();
    }
  }, [query]);
  return isSuccess ? (
    <Infinite
      dataLength={data.pages.length * data.pages[0].data.data.length}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={loader ?? <Loading size={25} />}
    >
      <Stack ref={ref} {...props} component={"div"}>
        {children}
      </Stack>
    </Infinite>
  ) : (
    <></>
  );
};
export default InfiniteScroll;
