export interface Post {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  threadId: number;
  creatorId: number;
  image: string;
}
