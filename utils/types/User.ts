export interface UserPanel {
  name: string;
  identity: number;
  name_show: string;
  show_nickname: string;
  profession_manager_nick_name: string;
  iconinfo: null;
  new_iconinfo: NewIconinfo;
  bg_id: number;
  portrait: string;
  portrait_h: string;
  portrait_time: number;
  sex: string;
  tb_age: string;
  post_num: number;
  honor: Honor;
  can_followed: number;
  is_block: number;
  is_private: number;
  mParr_props: any[];
  tbmall_month_icon: null;
  free_flag: null;
  marriage: any[];
  vipInfo: any[];
  tb_vip: boolean;
  followed_count: number;
}

export interface Honor {
  manager: null;
  grade: { [key: string]: Grade };
  novice: number;
}

export interface Grade {
  count: number;
  forum_list: string[];
}

export interface NewIconinfo {
  "1": The1;
}

export interface The1 {
  slot_no: string;
  slot_type: string;
  icon: string;
  value: string;
  end_time: string;
  name: string;
  weight: number;
  position: Position;
  terminal: Terminal;
  sprite: { [key: string]: string };
  category_id: number;
  type: number;
  price: number;
  is_force: number;
  is_advanced: number;
  title: string;
  title_url: string;
  intro: string;
  intro_url: string;
  forum_list: string;
  pay_pic_pc: string;
  pay_pic_pad: string;
  level_1: Level;
  level_2: Level;
  level_3: Level;
}

export interface Level {
  icon_3: string;
  icon_2: string;
  icon_1: string;
  icon_5: string;
  icon_4: string;
  icon_6: string;
  level_info: LevelInfo;
}

export interface LevelInfo {
  title: string;
  title_url: string;
  intro: string;
  intro_url: string;
  forum_list: string;
  pay_pic_pc: string;
  pay_pic_pad: string;
}

export interface Position {
  frs: number;
  pb: number;
  home: number;
  card: number;
}

export interface Terminal {
  pc: number;
  wap: number;
  client: number;
}

export interface FanRes {
  page: Page;
  user_list: RelativeUserList[];
  tips_text: string;
  follow_list_switch: string;
  server_time: string;
  time: number;
  ctime: number;
  logid: number;
  error_code: string;
}

export interface Page {
  page_size: string;
  offset: string;
  current_page: string;
  total_count: string;
  total_page: string;
  has_more: string;
  has_prev: string;
}

export interface RelativeUserList {
  id: string;
  name: string;
  portrait: string;
  follow_time: string;
  follow_from: FollowFrom;
  name_show: string;
  live_status: string;
  live_id: string;
  display_auth_type: string;
  work_creator_info: string;
  bazhu_grade: any[] | BazhuGradeClass | string;
  priv_sets: PrivSets | string;
  intro: string;
  is_followed: string;
  is_friend: string;
  has_concerned: string;
  is_fans: string;
  is_new: string;
  god_info?: GodInfo;
  new_god_data?: GodInfo;
}

export interface BazhuGradeClass {
  desc: string;
  forum_id: string;
  level: string;
}

export enum FollowFrom {
  a = "来自贴吧关注",
}

export interface GodInfo {
  apply_source: string;
  field: string;
  field_name: string;
  level_1_dir: string[];
  status: string;
  update_time: string;
  field_id?: string;
}


export interface FollowRes {
  total_follow_num: number;
  logid: string;
  pn: number;
  has_more: number;
  tips_text: string;
  follow_list_switch: number;
  server_time: number;
  time: number;
  error_code: number;
  ctime: string;
  follow_list: FollowList[];
  error_msg: string;
}

export interface FollowList {
  follow_from: FollowFrom;
  work_creator_info: WorkCreatorInfo;
  portrait: string;
  portraith: string;
  intro: string;
  priv_sets: PrivSets;
  bazhu_grade: AlaLiveInfo;
  business_account_info: BusinessAccountInfo;
  display_auth_type: number;
  id: number;
  name?: string;
  name_show: string;
  has_concerned: number;
  ala_live_info?: AlaLiveInfo;
  ala_info?: AlaInfo;
  new_god_data?: NewGodData;
}

export interface AlaInfo {
  anchor_live?: number;
  location: string;
  lng: number;
  lat: number;
}

export interface AlaLiveInfo {
}

export interface BusinessAccountInfo {
  is_business_account: number;
  is_forum_business_account: number;
}

export interface NewGodData {
  type_name: string;
  status: number;
  field_id: number;
  field_name: string;
  type: number;
}

export interface PrivSets {
  location?: number;
  like?: number;
  group?: number;
  post?: number;
  live?: number;
  reply?: number;
  bazhu_show_outside?: number;
}

export interface WorkCreatorInfo {
  auth_desc: string;
}

export interface LikeForum {
  id: string;
  name: string;
  favo_type: string;
  level_id: string;
  level_name: string;
  cur_score: string;
  levelup_score: string;
  avatar: string;
  slogan: string;
}

