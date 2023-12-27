export interface Thread {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  boardId: number;
  creatorId: number;
}
