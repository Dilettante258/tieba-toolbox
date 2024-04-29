import {Word} from "@cyberblast/react-wordcloud";

interface PostContent {
  type: number;
  text: string;
}

interface Content {
  postContent: Array< PostContent >;
  createTime: number;
  postType: number;
  postId: number;
};

export interface Post {
  forumId: number;
  threadId: number;
  postId: number;
  createTime: number;
  forumName: string;
  title: string;
  content: Array< Content >;
  userName: string;
  replyNum: number;
  userId: number;
  userPortrait: string;
  threadType: string;
  freqNum: number;
  nameShow: string;
};

export interface compactPost {
  forumId: number;
  forumName: string;
  title: string;
  threadId: number;
  postId: number;
  cid: number;
  createTime: string;
  affiliated: boolean;
  content: string;
  replyTo: string;
};

type Page = {
  page_size: string;
  offset: string;
  current_page: string;
  total_count: string;
  total_page: string;
  has_more: string;
  has_prev: string;
};

type Bazhu_grade = {
  desc: string;
  forum_id: string;
  level: string;
};

type Priv_sets = {
  post: string;
};

type God_info = {
  apply_source: string;
  field: string;
  field_name: string;
  level_1_dir: Array< string >;
  status: string;
  type: string;
  type_name: string;
  update_time: string;
};

type New_god_data = {
  apply_source: string;
  field: string;
  field_name: string;
  level_1_dir: Array< string >;
  status: string;
  type: string;
  type_name: string;
  update_time: string;
  field_id: string;
};

type User = {
  id: string;
  name: string;
  portrait: string;
  follow_time: string;
  follow_from: string;
  name_show: string;
  live_status: string;
  live_id: string;
  display_auth_type: string;
  work_creator_info: string;
  bazhu_grade: Bazhu_grade;
  priv_sets: Priv_sets;
  intro: string;
  is_followed: string;
  is_friend: string;
  has_concerned: string;
  is_fans: string;
  is_new: string;
  god_info?: God_info;
  new_god_data?: New_god_data;
};

export interface FansPage {
  page: Page;
  user_list: Array<User>;
  tips_text: string;
  follow_list_switch: string;
  server_time: string;
  time: number;
  ctime: number;
  logid: number;
  error_code: string;
};

type Statistics = {
  friend: number;
  followed: number;
  fans: number;
}

export interface RelatedPage extends FansPage {
  statistics: Statistics;
}



type Work_creator_info = {
  auth_desc: string;
};

type Business_account_info = {
  is_business_account: number;
  is_forum_business_account: number;
};

type Ala_info = {
  location: string;
  lng: number;
  lat: number;
};

type FollowList = {
  id: number;
  name: string;
  portrait: string;
  bazhu_grade: Bazhu_grade;
  display_auth_type: number;
  work_creator_info: Work_creator_info;
  name_show: string;
  portraith: string;
  intro: string;
  has_concerned: number;
  priv_sets: Priv_sets;
  business_account_info: Business_account_info;
  follow_from: string;
  ala_live_info?: Bazhu_grade;
  ala_info?: Ala_info;
};

export type FollowsPage = {
  total_follow_num: number;
  time: number;
  error_msg: string;
  pn: number;
  has_more: number;
  follow_list_switch: number;
  logid: string;
  ctime: string;
  server_time: number;
  error_code: number;
  follow_list: Array<FollowList>;
  tips_text: string;
};

export type followForumDetail = {
  id: string;
  name: string;
  favo_type: string;
  level_id: string;
  level_name: string;
  cur_score: string;
  levelup_score: string;
  avatar: string;
  slogan: string;
};


interface BaseResponse {
  length: number;
  cost: number;
};

export interface Post extends BaseResponse {
  result: compactPost[];
}

export interface CutPost extends BaseResponse {
  result: Word[];
}

export interface SimplePost extends BaseResponse {
  result: { forumName: string, createTime: number, content: string }[];
}


export interface threadPage {
  // threadList: ThreadList[]
  // forumInfo: ForumInfo
  // userList: PostUserList[]
  // emojicounter: Counter
  // emoticonCounter: Counter
}

export interface forumThreadCutPage {
  counter: forumThreadCounter
  cutResult: Counter
}

interface forumThreadCounter extends BasicCounter {
  timeLine: number[]
}

export interface getPostPage {
  result: getPost
}

export interface BasicCounter {
  emojicounter: Counter
  emoticonCounter: Counter
  userAttributesCount: userAttributesCount
}

export interface getPost extends BasicCounter {
  postList: PostList[]
  thread: BasicThread
  forum: ForumInfo
  timeLine: number[]
  contentList: string[]
}

export type Counter = {
  [key: string]: number
}

type userAttributesCount = {
  ipAddress: {
    name: string
    value: number
  }
  levelId: Counter
  gender: Counter
}

type PostList = {
  content: string
  id: string
  floor: number
  time: number
  subPostNumber: number
  authorId: string
  agree: Agree
  subPostList: {
    id: string
    authorId: string
    time: number
    content: string
  }[]
  signature?: string
}

interface BasicThread {
  id: string
  title: string
  replyNum: number
  author: PostUser
  threadType: number
  createTime: number
  postId: string
  agree: Agree
  shareNum: number
  originThreadInfo: any
  isShareThread: number
}

interface SimpleThread extends BasicThread {
  viewNum: number
  lastTimeInt: number
  isTop: number
  isGood: number
  fid: string
  firstPostId: string
  authorId: string
  pollInfo?: PollInfo
}

export interface Agree {
  agreeNum: string
  disagreeNum: string
}

interface ForumInfo {
  id: string
  name: string
  firstClass: string
  secondClass: string
  memberNum: number
  threadNum: number
  postNum: number
  managers?: {}[]
}

interface PostUser {
  id: string
  name: string
  nameShow: string
  portrait: string
  iconinfo?: {
    name: string
  }[]
  levelId: number
  isBawu: number
  bawuType: string
  fansNum: number
  sex: number
  gender: number
  privSets?: Priv_sets
  newGodData?: New_god_data
  isDefaultAvatar: number
  userGrowth: {
    levelId: number
  }
  newTshowIcon?: {
    name: string
  }[]
}

export interface PollInfo {
  isMulti: number
  totalNum: string
  options: {
    num: string
    text: string
  }[]
  totalPoll: string
  title: string
}



export const timeFormat = Intl.DateTimeFormat('zh-CN', {
  timeStyle: "short",
  dateStyle: "short",
});

export const methodDict:Record<string, string> = {
  "fans": "粉丝",
  "follows": "关注",
  "related": "关联",
}

export const method2Dict:Record<string, string> = {
  "user": "用户回复贴记录分析",
  "post": "帖子数据统计",
  "forum": "吧数据统计",
}