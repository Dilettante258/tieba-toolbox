import type {UserPost} from "@utils/types";

interface CleanDataOptions {
  threshold?: number;  // 阈值，默认0.9
  maxItems?: number;   // 最大显示数量，默认10
  othersName?: string; // "其他"项的名称，默认"其他"
}

export class UserPostClass {
  private upData: UserPost[] = [];
  public readonly dividerMap;
  private static dateFormat = new Intl.DateTimeFormat('zh-CN', {year: 'numeric', month: '2-digit', day: '2-digit'});
  // private dateFormat: Intl.DateTimeFormat;

  constructor(data: UserPost[]) {
    this.upData = data.sort((a, b) => Number(b.createTime) - Number(a.createTime));
    this.dividerMap = this.getDivider();
  }

  get data(){
    return this.upData;
  }

  public getDivider(){
    const earliestYear = new Date(this.upData[this.upData.length - 1].createTime).getFullYear();
    const nowYear =  new Date().getFullYear();
    const yearList = Array.from({length: nowYear - earliestYear + 1}, (_,i) => i+earliestYear).reverse();
    const dividerMap: {
      data: Array<[string, number]>;
      get last(): number;
    } = {
      data:[],
      get last() {
        return this.data[this.data.length - 1] ? this.data[this.data.length - 1][1] : 0;
      },
    };
    dividerMap.data.push([String(yearList[0]), 0]);
    for (const year of yearList.slice(0, -1)){
      let count = dividerMap.last;
      for (const post of this.upData.slice(dividerMap.last)){
        
        if (new Date(post.createTime).getFullYear() !== year) {
          dividerMap.data.push([String(year - 1), count]);
          break;
        }
        count += 1;
      }
    }
    return Object.fromEntries(dividerMap.data);
    
  }

  public getPostListFromYear(year: number | 'ALL') {
    if (year === 'ALL') {
      return this.upData;
    }
    if (this.dividerMap !== undefined) {
      const start = this.dividerMap[year];
      const end = this.dividerMap[String(year - 1)] ?? -1;
      return this.upData.slice(start, end);
    }
    return this.upData.filter(post => new Date(post.createTime).getFullYear() === year);
  }

  public postList2HeatMap(year: number | 'ALL') {
    const temp: {[k: string]: number} = {};
    const postList = year === 'ALL' ? this.upData : this.getPostListFromYear(year);
    for (const post of postList) {
      const postTime = new Date(post.createTime);
      const postDate = UserPostClass.dateFormat.format(postTime).replaceAll('/','-');
      const count = temp[postDate] ?? 0;
      temp[postDate] = count + 1;
    }
    const result = [];
    
    for (const [date, count] of Object.entries(temp)) {
      let level = 0;
      if (count >= 8) {
        level = 4;
      } else if (count >= 5) {
        level = 3;
      } else if (count >= 3) {
        level = 2;
      } else if (count >= 1) {
        level = 1;
      }
      result.push({ date, count, level });
    }
    if (year !== 'ALL' && !(`${year}-12-31` in temp)) {
      result.push({ date: `${year}-12-31`, count: 0, level: 0 });
    }
    if (year !== 'ALL' && !(`${year}-01-01` in temp)) {
      result.unshift({ date: `${year}-01-01`, count: 0, level: 0 });
    }
    return result.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  public getForumDistribution(year: number | 'ALL', cleanData?: CleanDataOptions) {
    const temp: {[k: string]: number} = {};
    const postList = year === 'ALL' ? this.upData : this.getPostListFromYear(year);
    for (const post of postList) {
      const count = temp[post.forumName] ?? 0;
      temp[post.forumName] = count + 1;
    }
    let result = Object.entries(temp).map(([key, value]) => {
      return { name: key, value };
    }).sort((a, b) => {
      return b.value - a.value;
    });

    if (cleanData) {
      const { threshold = 0.9, maxItems = 10, othersName = '其他' } = cleanData;
      const total = result.reduce((sum, item) => sum + item.value, 0);
      let currentSum = 0;
      const filteredResult = [];
      let othersValue = 0;

      for (let i = 0; i < result.length; i++) {
        if (i < maxItems && currentSum / total < threshold) {
          filteredResult.push(result[i]);
          currentSum += result[i].value;
        } else {
          othersValue += result[i].value;
        }
      }

      if (othersValue > 0) {
        filteredResult.push({ name: othersName, value: othersValue });
      }

      result = filteredResult;
    }

    return result;
  }

  public getPostListFromDay(date: ConstructorParameters<typeof Date>[number]){
    const time = new Date(date);
    const postList = this.getPostListFromYear(time.getFullYear());
    const result = [];
    for (const post of postList) {
      const postTime = new Date(post.createTime);
      if (postTime.getMonth() === time.getMonth() && postTime.getDate() === time.getDate()){
        result.push(post);
      } else if (postTime.getMonth() < time.getMonth()){
        // 因为是倒序排列的
        break;
      }
    }
    return result;
  }

  public getTimeDistribution(year: number | 'ALL'): Array<[Date, number]> {
    const postList = year === 'ALL' ? this.upData : this.getPostListFromYear(year);
    const result: Array<[Date, number]> = [];

    for (const post of postList) {
      const postTime = new Date(post.createTime);
      postTime.setFullYear(2025);
      result.push([postTime , postTime.getHours()]);
    }

    return result;
  }

  private collectYearForumData() {
    const yearForumMap = new Map<string, Map<string, number>>();
    const yearSet = new Set<string>();
    const forumSet = new Set<string>();

    for (const post of this.upData) {
      const year = new Date(post.createTime).getFullYear().toString();
      yearSet.add(year);
      forumSet.add(post.forumName);
      
      if (!yearForumMap.has(year)) {
        yearForumMap.set(year, new Map());
      }
      const forumMap = yearForumMap.get(year);
      if (forumMap) {
        forumMap.set(post.forumName, (forumMap.get(post.forumName) || 0) + 1);
      }
    }

    return { yearForumMap, yearSet, forumSet };
  }

  private generateNodes(yearSet: Set<string>, forumSet: Set<string>) {
    return [
      ...Array.from(yearSet).map(year => ({ name: year })),
      ...Array.from(forumSet).map(forum => ({ name: forum }))
    ];
  }

  private generateLinks(yearForumMap: Map<string, Map<string, number>>) {
    const links: { source: string; target: string; value: number }[] = [];
    for (const [year, forumMap] of yearForumMap) {
      for (const [forum, count] of forumMap) {
        links.push({ source: year, target: forum, value: count });
      }
    }
    return links;
  }

  private cleanSankeyData(
    links: { source: string; target: string; value: number }[],
    nodes: { name: string }[],
    cleanData: CleanDataOptions
  ) {
    const { threshold = 0.9, maxItems = 10, othersName = '其他' } = cleanData;
    
    // 计算每个贴吧的总发帖数
    const forumTotalMap = new Map<string, number>();
    for (const link of links) {
      forumTotalMap.set(link.target, (forumTotalMap.get(link.target) || 0) + link.value);
    }

    const total = this.data.length;
    const sortedForums = Array.from(forumTotalMap.entries())
      .sort((a, b) => b[1] - a[1]);

    // 确定要保留的贴吧
    const keptForums = new Set<string>();
    let currentSum = 0;
    for (let i = 0; i < sortedForums.length; i++) {
      if (i < maxItems && currentSum / total < threshold) {
        keptForums.add(sortedForums[i][0]);
        currentSum += sortedForums[i][1];
      }
    }

    // 过滤和重组数据
    const filteredLinks: { source: string; target: string; value: number }[] = [];
    const othersMap = new Map<string, number>();

    for (const link of links) {
      if (keptForums.has(link.target)) {
        if (link.value > 0) {
          filteredLinks.push(link);
        }
      } else {
        const key = `${link.source}-${othersName}`;
        othersMap.set(key, (othersMap.get(key) || 0) + link.value);
      }
    }

    // 添加"其他"节点
    if (othersMap.size > 0) {
      const othersValue = Array.from(othersMap.values()).reduce((sum, value) => sum + value, 0);
      if (othersValue > 0) {
        nodes.push({ name: othersName });
        for (const [key, value] of othersMap) {
          if (value > 0) {
            const [source] = key.split('-');
            filteredLinks.push({
              source,
              target: othersName,
              value
            });
          }
        }
      }
    }

    // 过滤掉没有连接的节点
    const usedNodes = new Set<string>();
    for (const link of filteredLinks) {
      usedNodes.add(link.source);
      usedNodes.add(link.target);
    }
    const filteredNodes = nodes.filter(node => usedNodes.has(node.name));

    return { nodes: filteredNodes, links: filteredLinks };
  }

  public getSankeyData(cleanData?: CleanDataOptions) {
    const { yearForumMap, yearSet, forumSet } = this.collectYearForumData();
    const nodes = this.generateNodes(yearSet, forumSet);
    const links = this.generateLinks(yearForumMap);

    if (cleanData) {
      return this.cleanSankeyData(links, nodes, cleanData);
    }

    return { nodes, links };
  }
}
