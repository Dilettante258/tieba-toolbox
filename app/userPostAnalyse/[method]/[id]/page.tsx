"use client";

import dynamic from "next/dynamic";

import styles from "@/app/userPostAnalyse/UserPostAnalyse.module.css";
import { UserPostListItemComp } from "@custom/UserPost";
import type { UserPost } from "@utils/types";
const PostActivityCalendar = dynamic(
  () => import("@custom/PostActivityCalendar"),
  { ssr: false }
);
import { BaChart, SankeyChart, ScatterChart } from "@custom/Chart";
import type { clickEvent } from "@custom/Chart";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import UpStyles from "@custom/UserPost.module.css";

function highlight(search: string) {
  const textNode1 = document.getElementsByClassName(UpStyles.postContent);
  const textNode2 = document.getElementsByClassName(UpStyles.postTitle);
  const textNode = [...textNode1, ...textNode2];
  const colorHighlight = new Highlight();
  CSS.highlights.set(`rainbow-color`, colorHighlight);
  if (textNode.length > 0 && search !== "") {
    for (const node of textNode) {
      try {
        const textNode = node.firstChild;
        if (textNode) {
          const searchIndex = textNode.textContent?.indexOf(search) ?? -1;
          if (searchIndex !== -1) {
            const range = new Range();
            range.setStart(textNode, searchIndex);
            range.setEnd(textNode, searchIndex + search.length);
            colorHighlight.add(range);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

function PostListRowVirtualizer({
  data,
  search,
  asc,
}: {
  data: Array<UserPost>;
  search: string;
  asc: boolean;
}) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const filteredData = useMemo(() => {
    if (search === "") {
      return data;
    }
    return data.filter(
      (item) => item.content.includes(search) || item.title.includes(search)
    );
  }, [data, search, asc]);

  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

  useEffect(() => {
    highlight(search);
  }, [filteredData]);
  useEffect(() => {
    if (parentRef.current) {
      const node = parentRef.current;
      node.addEventListener("scroll", () => {
        highlight(search);
        ("scroll");
      });
      return () => {
        node.removeEventListener("scroll", () => {
          highlight(search);
        });
      };
    }
  }, [search]);

  return (
    <div ref={parentRef} className={clsx(styles.list)}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <UserPostListItemComp
            key={virtualRow.index}
            className={
              virtualRow.index % 2 ? styles.listItemOdd : styles.listItemEven
            }
            style={{
              transform: `translateY(${virtualRow.start}px)`,
            }}
            post={
              asc
                ? filteredData[virtualRow.index]
                : filteredData[filteredData.length - virtualRow.index - 1]
            }
          />
        ))}
      </div>
    </div>
  );
}

function YearSelector({
  yearRange,
  setSelectedYear,
}: {
  yearRange: number[];
  setSelectedYear: UPSelectorStore["setSelectedYear"];
}) {
  const selectedYear = useUPSelectorStore((state) => state.selectedYear);
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (
      event.target instanceof HTMLLIElement &&
      event.target.tagName === "LI"
    ) {
      setSelectedYear(
        event.target.innerText === "所有"
          ? "ALL"
          : Number.parseInt(event.target.innerText)
      );
    }
  }

  return (
    <div className={styles.YearSelect}>
      <ul onClickCapture={handleClick} className={styles.YearList}>
        <li
          key="ALL"
          className={styles.YearItem}
          data-selected={selectedYear === "ALL"}
        >
          所有
        </li>
        {yearRange.map((year) => (
          <li
            key={year}
            className={styles.YearItem}
            data-selected={year === selectedYear}
          >
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
}

import DataIndicator from "@/app/userPostAnalyse/components/DataIndicator";
import Module from "@/app/userPostAnalyse/components/Module";
import { Button } from "@/components/basic/Button";
import { SearchField } from "@/components/basic/SearchField";
import { useWindowSize } from "@/utils/hooks";
import {
  type InfiniteData,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { GET, isErrorMsg } from "@utils/api";
import { UserPostClass } from "@utils/userPost";
import { ArrowUpDown } from "lucide-react";
import type { Activity } from "react-activity-calendar";
import { UPSelectorStore, useUPSelectorStore } from "@/utils/store/app";
import { useTheme } from "next-themes";

export default function UserPostAnalyseContentPage({
  params,
}: {
  params: { method: string; id: string };
}) {
  const date = useUPSelectorStore((state) => state.selectedDate);
  const [hiddenModules, setHiddenModules] = useState<Set<string>>(new Set());

  const handleHideModule = (moduleTitle: string) => {
    setHiddenModules((prev) => {
      const newSet = new Set(prev);
      newSet.add(moduleTitle);
      return newSet;
    });
  };

  const year = useUPSelectorStore((state) => state.selectedYear);
  const forum = useUPSelectorStore((state) => state.selectedForum);
  const prevChange = useUPSelectorStore((state) => state.prevChange);
  const lastChange = useUPSelectorStore((state) => state.lastChange);
  const setSelectedDate = useUPSelectorStore((state) => state.setSelectedDate);
  const setSelectedYear = useUPSelectorStore((state) => state.setSelectedYear);
  const setSelectedForum = useUPSelectorStore(
    (state) => state.setSelectedForum
  );

  const [search, setSearch] = useState("");
  const [asc, setAsc] = useState(true);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }: UseInfiniteQueryResult<
    InfiniteData<UserPost[], [number, number]>,
    Error
  > = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const res = await GET<UserPost[]>(
        `http://localhost:8000/user/postsBatch?method=${params.method}&id=${params.id}&fromP=${pageParam[0]}&toP=${pageParam[1]}`
      );
      if (isErrorMsg(res)) {
        console.error(res);
        throw new Error(res.error);
      }
      return res;
    },
    initialPageParam: [1, 10],
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return [lastPageParam[0] + 10, lastPageParam[1] + 10];
    },
  });

  const pageNumber = data?.pages.length ?? 0;

  const up = useMemo(() => {
    if (status === "success" && data) {
      return new UserPostClass(data.pages.flat());
    }
  }, [pageNumber, status]);

  const eventHandlers = {
    onClick: () => (activity: Activity) => {
      setSelectedDate(activity.date);
    },
  };

  const eventDic = useMemo(
    () => ({
      click: (params: clickEvent) => {
        setSelectedForum(params.data.name);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { yearRange, yearRangeStr } = useMemo(() => {
    const yearRange = Object.keys(up?.dividerMap || {}).map(Number);
    return {
      yearRange,
      yearRangeStr:
        year === "ALL"
          ? `从${yearRange[0]}年到${yearRange[yearRange.length - 1]}年`
          : `${year}年的记录`,
    };
  }, [pageNumber, up, year]);

  if (data && up) {
    const DA = up?.getForumDistribution(year, {
      threshold: 0.96,
      maxItems: 5,
      othersName: "其他贴吧",
    });

    function filterDataByLastChange(): UserPost[] {
      switch (lastChange) {
        case "year":
          return up?.getPostListFromYear(year) || [];
        case "date":
          return up?.getPostListFromDay(date) || [];
        case "forum":
          return (
            up?.getPostListFromYear(year).filter((post) => {
              if (forum === "其他贴吧") {
                return !DA?.map((item) => item.name).includes(post.forumName);
              }
              return post.forumName === forum;
            }) ?? []
          );
      }
    }

    return (
      <div className={clsx(styles.container)}>
        <div className={styles.calendarContainer}>
          {!hiddenModules.has("发帖热力图") && (
            <Module onHide={() => handleHideModule("发帖热力图")}>
              <Module.Title>发帖热力图</Module.Title>
              <Module.Description>{yearRangeStr}</Module.Description>
              <PostActivityCalendar
                data={up.postList2HeatMap(year)}
                eventHandlers={eventHandlers}
              />
            </Module>
          )}
          <Module notShowPopover={true}>
            <Module.Title>数据控制器</Module.Title>
            <DataIndicator
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              error={error}
              status={status}
              data={data}
            />
          </Module>
          <Module notShowPopover={true}>
            <Module.Title>年份选择</Module.Title>
            <YearSelector
              setSelectedYear={setSelectedYear}
              yearRange={yearRange}
            />
          </Module>
        </div>
        {!hiddenModules.has("发帖列表") && (
          <Module onHide={() => handleHideModule("发帖列表")}>
            <div className="flex flex-row gap-2 flex-wrap">
              <div>
                <Module.Title>发帖列表</Module.Title>
                <Module.Description className="w-72">
                  {(() => {
                    switch (lastChange) {
                      case "year":
                        return `${yearRangeStr}`;
                      case "date":
                        return `${date}的发帖`;
                      case "forum":
                        switch (prevChange) {
                          case "year":
                            return `${year}年的${forum}吧发帖`;
                          case "date":
                            return `${date}的${forum}吧发帖`;
                        }
                    }
                  })()}
                </Module.Description>
              </div>
              <div className="flex flex-row gap-2 items-center p-3 max-sm:mx-auto">
                <SearchField
                  aria-label="Search"
                  value={search}
                  onChange={setSearch}
                  className="col-span-3 sm:col-span-1"
                  defaultValue={""}
                />
                <Button
                  variant="icon"
                  onPress={() => setAsc(!asc)}
                  className="border border-gray-300 dark:border-zinc-500 forced-colors:border-[ButtonBorder] rounded-md"
                >
                  <ArrowUpDown className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <PostListRowVirtualizer
              data={filterDataByLastChange()}
              search={search}
              asc={asc}
            />
          </Module>
        )}
        <BaChartRow
          hiddenModules={hiddenModules}
          handleHideModule={handleHideModule}
          yearRangeStr={yearRangeStr}
          eventDic={eventDic}
          up={up}
          year={year}
          yearRange={yearRange}
        />
      </div>
    );
  }
}

function BaChartRow({
  hiddenModules,
  handleHideModule,
  yearRangeStr,
  eventDic,
  up,
  year,
  yearRange,
}: {
  hiddenModules: Set<string>;
  handleHideModule: (moduleTitle: string) => void;
  yearRangeStr: string;
  eventDic: Record<string, (params: clickEvent) => void>;
  up: UserPostClass;
  year: number | "ALL";
  yearRange: number[];
}) {
  const { width } = useWindowSize();
  const { resolvedTheme } = useTheme();

  const calcChartWidth = () => {
    if (width > 1500) {
      return Math.min(width * 0.7 * 0.3, 500);
    }
    if (width < 768) {
      return width * 0.9;
    }
    return width * 0.43;
  };

  const chartStyles: React.CSSProperties = {
    width: `${calcChartWidth()}px`,
    height: `${width > 700 ? 300 : width * 0.5}px`,
  };

  return (
    <div className={styles.chartContainer}>
      {!hiddenModules.has("发帖所在吧分布") && (
        <Module onHide={() => handleHideModule("发帖所在吧分布")}>
          <Module.Title>发帖所在吧分布</Module.Title>
          <Module.Description>{yearRangeStr}</Module.Description>
          <BaChart
            onEvents={eventDic}
            style={chartStyles}
            data={up.getForumDistribution(year, {
              threshold: 0.96,
              maxItems: 5,
              othersName: "其他贴吧",
            })}
            theme={resolvedTheme}
          />
        </Module>
      )}
      {!hiddenModules.has("发帖时间分布") && (
        <Module onHide={() => handleHideModule("发帖时间分布")}>
          <Module.Title>发帖时间分布</Module.Title>
          <Module.Description>{yearRangeStr}</Module.Description>
          <ScatterChart
            data={up.getTimeDistribution(year)}
            style={chartStyles}
            theme={resolvedTheme}
          />
        </Module>
      )}
      {!hiddenModules.has("发帖时间桑基图") && (
        <Module onHide={() => handleHideModule("发帖时间桑基图")}>
          <Module.Title>发帖时间桑基图</Module.Title>
          <Module.Description>
            {`从${yearRange[0]}年到${yearRange[yearRange.length - 1]}年`}
          </Module.Description>
          <SankeyChart
            style={chartStyles}
            theme={resolvedTheme}
            data={up.getSankeyData({
              threshold: 0.9,
              maxItems: 10,
              othersName: "其他",
            })}
          />
        </Module>
      )}
    </div>
  );
}
