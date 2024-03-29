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

type User_list = {
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

export type FansPage = {
  page: Page;
  user_list: Array<User_list>;
  tips_text: string;
  follow_list_switch: string;
  server_time: string;
  time: number;
  ctime: number;
  logid: number;
  error_code: string;
};


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

type Follow_list = {
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
  follow_list: Array<Follow_list>;
  tips_text: string;
};


export const timeFormat = Intl.DateTimeFormat('zh-CN', {
  timeStyle: "short",
  dateStyle: "short",
})
