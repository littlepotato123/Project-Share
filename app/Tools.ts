export enum Pages {
    HOME,
    AUTH,
    TRENDING,
    LEADERBOARD,
    USER,
    CATEGORIES,
    SUPPORTED,
    SUPPORTING,
    WRONG_USER,
    NEWPOST,
    ABOUT,
    CATEGORY_PAGE,
    WRONG_CATEGORY,
    EDIT
}

export type Posts = {
    id: number;
    title: string;
    author: string;
    category: string;
    body: string;
    createdAt: string;
    liked: Array<string>;
    likes: number
};

export type Comments = {
    id: number;
    body: string;
    postId: number;
    author: string;
}