export interface RawUserPost {
    forumId: string;
    threadId: string;
    postId: string;
    createTime: number;
    forumName: string;
    title: string;
    content: Content[];
    userName: string;
    replyNum: number;
    userId: string;
    userPortrait: string;
    threadType: string;
    freqNum: number;
    nameShow: string;
}
export interface Content {
    postContent: PostContent[];
    createTime: string;
    postType: string;
    postId: string;
}
export interface PostContent {
    type: number;
    text: string;
}
export type UserPost = {
    forumId: number;
    forumName: string;
    title: string;
    threadId: string;
    postId: string;
    cid: string;
    createTime: string | number;
    affiliated: boolean;
    content: string;
    replyTo?: string;
};
