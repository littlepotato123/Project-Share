export enum Pages {
    HOME,
    AUTH,
    TRENDING,
    LEADERBOARD,
    USER,
    CATEGORIES,
    SUPPORTED,
    SUPPORTING,
    NEWPOST,
    ABOUT,
    CATEGORY_PAGE,
    EDIT
}

export type Post = {
    id: number;
    title: string;
    author: string;
    category: string;
    body: string;
    createdAt: string;
    liked: Array<string>;
    likes: number
};

export type Comment = {
    id: number;
    postId: number;
    body: string;
    author: string;
};

export type User = {
    id: number;
    handle: string;
    password: string;
    imageUrl: string;
    bio: string;
    points: string;
    awards: Array<string>;
    supporters: number;
    supported: Array<string>;
    supporting: Array<string>;
    layout: number;
    messages: Array<string>;
    liked: Array<number>;
}

export type L_User = {
    id: number;
    handle: string;
    bio: string;
    points: number;
    supporters: number;
}

export type Category = {
    id: number;
    title: string;
    description: string;
};