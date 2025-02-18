import type { Agree, simpleAgree } from "./common.js";
export interface PostRes {
    forum: Forum;
    page: Page;
    postList: PostList[];
    thread: Thread;
    userList: UserList[];
    threadFreqNum: string;
}
interface Forum {
    id: string;
    name: string;
    firstClass: string;
    secondClass: string;
    memberNum: number;
    postNum: number;
}
interface Page {
    pageSize: number;
    currentPage: number;
    totalPage: number;
    hasMore: number;
    hasPrev: number;
}
export interface PostList {
    id: string;
    floor: number;
    time: number;
    content: PostListContent[];
    subPostNumber: number;
    authorId: string;
    agree: Agree;
    subPostList?: PostListSubPostList;
    signature?: Signature;
}
export interface PostListContent {
    type: number;
    text?: string;
    bsize?: string;
    cdnSrc?: string;
    bigCdnSrc?: string;
    originSrc?: string;
    originSize?: number;
    c?: string;
}
interface Signature {
    content: SignatureContent[];
}
interface SignatureContent {
    type: number;
    text: string;
}
interface PostListSubPostList {
    subPostList: SubPostListElement[];
}
interface SubPostListElement {
    id: string;
    content: SubPostListContent[];
    time: number;
    authorId: string;
    title: string;
    floor: number;
}
interface SubPostListContent {
    type: number;
    text: string;
    c?: string;
    uid?: string;
}
interface Thread {
    id: string;
    title: string;
    replyNum: number;
    author: Author;
    threadType: number;
    createTime: number;
    postId: string;
    agree: Agree;
    shareNum: number;
    originThreadInfo: OriginThreadInfo;
    isShareThread: number;
}
interface Author {
    id: string;
    name: string;
    nameShow: string;
    portrait: string;
    iconinfo: Iconinfo[];
    levelId: number;
    isBawu: number;
    bawuType: string;
    fansNum: number;
    gender: number;
    privSets: AuthorPrivSets;
    newGodData: AuthorNewGodData;
    ipAddress: string;
    userGrowth: UserGrowth;
}
interface Iconinfo {
    name: string;
}
interface AuthorNewGodData {
    fieldId: number;
}
interface AuthorPrivSets {
    location: number;
    like: number;
    group: number;
    live: number;
}
interface UserGrowth {
    levelId: number;
}
interface OriginThreadInfo {
    title: string;
    media: Media[];
    fname: string;
    tid: string;
    fid: string;
    content: OriginThreadInfoContent[];
    pollInfo: PollInfo;
}
interface OriginThreadInfoContent {
    type: number;
    text: string;
    link: string;
    src: string;
    bsize: string;
    c: string;
    duringTime: number;
    uid: string;
    width: number;
    height: number;
    originSrc: string;
    originSize: number;
}
interface Media {
    type: number;
    smallPic: string;
    bigPic: string;
    waterPic: string;
    width: number;
    height: number;
}
interface PollInfo {
    isMulti: number;
    totalNum: string;
    totalPoll: string;
    title: string;
}
export interface UserList {
    id: string;
    name?: string;
    nameShow?: string;
    portrait: string;
    iconinfo?: Iconinfo[];
    levelId?: number;
    isBawu?: number;
    bawuType?: BawuType;
    fansNum?: number;
    gender?: number;
    privSets?: UserListPrivSets;
    newGodData?: UserListNewGodData;
    ipAddress?: string;
    userGrowth?: UserGrowth;
}
declare enum BawuType {
    Assist = "assist",
    Empty = ""
}
interface UserListNewGodData {
    fieldId: number;
    status?: number;
    fieldName?: string;
}
interface UserListPrivSets {
    location?: number;
    like?: number;
    group?: number;
    live?: number;
    post?: number;
    friend?: number;
    reply?: number;
}
export interface OutputSubPostList {
    id: string;
    content: string;
    time: number;
    authorId: string;
    otherId?: string;
    otherName?: string;
}
export interface OutputPostList {
    id: string;
    floor: number;
    time: number;
    content: string;
    subPostNumber: number;
    authorId: string;
    agree: simpleAgree;
    subPostList?: OutputSubPostList[];
    signature?: string;
}
export {};
