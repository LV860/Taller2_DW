export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  reactions: Reactions;
}

export interface Reactions {
  likes: number;
  dislikes: number;
}
