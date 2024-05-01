declare namespace MatchingCard {
  export interface MatchingCard {
    id: number;
    status: MatchingStatus;
    cardGrade: CardGrade | null;

    adminUUID: string | null;
    matchingUsers?: Partial<User.User>[] | null;

    chatRoomId: number | null;
    chatRoom: Partial<ChatRoom.ChatRoom> | null;

    reviews: Partial<Review.Review>[] | null;

    createdAt: Date | string;
    updatedAt: Date | string;
  }

  export type CardGrade = 'BLACK' | 'RED' | 'GOLD' | 'BLUE' | 'PURPLE';
  export type MatchingStatus =
    | 'CREATED'
    | 'MATCHED'
    | 'REQUESTED'
    | 'W_REJECTED'
    | 'PENDING'
    | 'M_REJECTED'
    | 'REMOVED'
    | 'TIME_OUT';

  export type CreateMatchingCard = {
    cardGrade?: CardGrade;

    womanUUID: string;
    manUUID: string;

    status?: MatchingStatus;
    chatRoomId?: number;
  } & Partial<MatchingCard>;

  export type UpdateMatchingCard = {
    cardGrade?: string;
    status: MatchingStatus;
    chatRoomId?: number;
    reviews?: Review.Review[];
  };

  export type CreateReq = api.BasicReq<CreateMatchingCard>;
  export type CreateRes = api.BasicRes<MatchingCard>;

  export type UpdateReq = api.BasicReq<UpdateMatchingCard>;
  export type UpdateRes = api.BasicRes<MatchingCard>;

  export type FindOneReq = api.BasicReq;
  export type FindOneRes = api.BasicRes<MatchingCard>;

  export type Res = api.BasicRes<MatchingCard>;

  export type ListReq = api.BasicListReq<Partial<MatchingCard>>;
  export type ListRes = api.BasicListRes<Partial<MatchingCard>>;

  export type Select = Partial<Record<keyof MatchingCard, boolean>>;
  export type Where = api.BasicWhere<Partial<MatchingCard>>;
  export type OrderBy = api.BasicOrderBy<Partial<MatchingCard>>;

  export type SortKey = keyof MatchingCard;
  export type SortOrder = 'asc' | 'desc';
}
