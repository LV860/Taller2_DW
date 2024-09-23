import { User } from "./User";

interface Comment{
  id: number;
  body : string;
  postId: number;
  likes: number;
  user: User;
}
