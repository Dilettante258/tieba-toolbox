import type {Agree} from "./common";

export interface ForumThreadRes {
	forum: Forum;
	page: ForumThreadPage;
	threadList: Thread[];
	userList: UserList[];
	navTabInfo: NavTabInfo;
	forumRule: ForumRule;
}

interface Forum {
	id: string;
	name: string;
	firstClass: string;
	secondClass: string;
	memberNum: number;
	threadNum: number;
	postNum: number;
	managers: Manager[];
}

type Manager = {};

export interface ForumThreadPage {
	pageSize: number;
	currentPage: number;
	totalCount: number;
	totalPage: number;
	hasMore: number;
	hasPrev: number;
}

export interface Thread {
	id: string;
	title: string;
	replyNum: number;
	viewNum: number;
	lastTimeInt: number;
	isTop: number;
	isGood: number;
	isVoiceThread: number;
	voiceInfo?: any;
	author: any;
	threadType: number;
	fid: string;
	firstPostId: string;
	createTime: number;
	authorId: string;
	agree: Agree;
	shareNum: number;
	firstPostContent: FirstPostContent[];
	tabId?: number;
}

export interface FirstPostContent {
	type: number;
	text?: string;
	bsize?: string;
	cdnSrc?: string;
	bigCdnSrc?: string;
	originSrc?: string;
	originSize?: number;
	c?: string;
}

interface UserList {
	id: string;
	name: string;
	nameShow: string;
	portrait: string;
	iconinfo?: Iconinfo[];
	levelId: number;
	isBawu: number;
	bawuType: string;
	fansNum: number;
	sex: number;
	gender: number;
	privSets?: PrivSets;
	newGodData?: NewGodData;
	isDefaultAvatar: number;
	userGrowth: UserGrowth;
}

interface Iconinfo {
	name: string;
}

interface PrivSets {
	like: number;
	live?: number;
	group?: number;
	post?: number;
	reply?: number;
	location?: number;
}

interface NewGodData {
	status: number;
	fieldId: number;
	fieldName: string;
}

interface UserGrowth {
	levelId: number;
}

interface NavTabInfo {
	tab: Tab[];
}

interface Tab {
	tabId: number;
	tabName: string;
}

interface ForumRule {
	hasForumRule: number;
}


export interface ForumMemberRes {
	data: ForumMember[];
	pageData: ForumMemberPageData;
}

export interface ForumMember {
	portrait: string;
	username: string;
	nickname: string;
}

export interface ForumMemberPageData {
	all: number;
	now: number;
	membersNum: number;
	forumId: number,
	forumName: string,
}
