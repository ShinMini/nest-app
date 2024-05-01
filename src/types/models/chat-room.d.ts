declare namespace ChatRoom {
  export type ChatRoom = {
    id: number;
    uuid: string;

    thumbnail: string;
    title: string | null;

    unreadCount: number;
    notification: boolean;
    lastMessage: string | null;

    status: ChatRoomStatus;
    messages: Partial<Message.Message>[] | null;

    participants?: Partial<User.User>[] | null;
    matchingCard?: Partial<MatchingCard.MatchingCard> | null;

    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ChatRoomStatus =
    | 'CREATED'
    | 'PENDING'
    | 'OPENED'
    | 'CLOSED'
    | 'REMOVED';

  export type ListReq = api.BasicListReq<Partial<ChatRoom>>;
  export type ListRes = api.BasicListRes<ChatRoom>;

  export type FindOneReq = api.BasicReq<Partial<ChatRoom>>;
  export type FindOneRes = api.BasicRes<ChatRoom>;

  export type CreateParam = {
    title: string;
    thumbnail?: string;
    participants: number[];
  };

  export type CreateRes = api.BasicRes<ChatRoom>;

  export type UpdateParam = {
    id: number;
    title?: string;
    thumbnail?: string;
    participants?: number[];
  };

  export type UpdateRes = api.BasicRes<ChatRoom>;

  export type DeleteParam = {
    id: number;
  };
}
