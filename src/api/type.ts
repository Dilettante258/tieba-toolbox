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



export const timeFormat = Intl.DateTimeFormat('zh-CN', {
  timeStyle: "short",
  dateStyle: "short",
})
