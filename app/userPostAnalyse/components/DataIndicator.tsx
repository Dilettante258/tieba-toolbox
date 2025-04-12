import { Button } from "@/components/basic/Button";
import { UserPost } from "@/utils/types";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { Fragment } from "react";

import styles from "../UserPostAnalyse.module.css";

type IQRType = UseInfiniteQueryResult<
  InfiniteData<UserPost[], [number, number]>,
  Error
>;

export default function DataIndicator(
  prop: Pick<
    IQRType,
    | "error"
    | "fetchNextPage"
    | "hasNextPage"
    | "isFetching"
    | "isFetchingNextPage"
    | "status"
    | "data"
  >
) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = prop;

  return (
    <div className="flex flex-col gap-2">
      <div className={styles.dataIndicatorContent}>
        <h3>当前数据范围</h3>
        {status === "pending" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error: {error?.message}</p>
        ) : (
          <Fragment>
            <p>
              页数范围：
              <span>
                从{data?.pageParams[0][0] ?? 1}到
                {data?.pageParams.at(-1)?.[1] ?? 10}页
              </span>
            </p>
            <p>
              总数据条数：
              <span>{data?.pages.flat().length}</span>
            </p>
            <p>
              本次查询新增：
              <span>{data?.pages.at(-1)?.length}</span>
            </p>
            <p>
              时间范围：&nbsp;
              <span>
                {data?.pages.at(-1)?.at(-1)?.createTime}到
                {data?.pages.at(-1)?.at(0)?.createTime}
              </span>
            </p>
          </Fragment>
        )}
      </div>

      <Button
        onPress={() => fetchNextPage()}
        isDisabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "正在加载..."
          : hasNextPage
          ? "加载更多"
          : "没有更多了"}
      </Button>
    </div>
  );
}
