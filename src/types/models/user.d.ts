declare namespace User {
  export interface User {
    id: number | null;
    role: Role | null;
    loginVia: LoginVia | null;
    socialAccount: SocialAccount.SocialAccount[] | null;

    uuid: string | null;
    password: string | null;
    email: string | null;

    username: string | null | null;
    nickname: string | null | null;

    gender: Gender | null;

    fcmToken: FcmToken.FcmToken[] | null;
    refreshToken: string | null | null;

    grade: Grade | null;
    avatar: string | null;
    likeImages?: Partial<Image.Image>[] | null;

    profile: Partial<Profile.Profile> | null;
    profileUpdateRequest?: Partial<ProfileUpdateRequest.ProfileUpdateRequest> | null;

    properties: Property[] | null;
    preference: Partial<Preference.Preference> | null;

    matchingCard: Partial<MatchingCard.MatchingCard>[] | null;
    chatRooms: Partial<ChatRoom.ChatRoom>[] | null;

    orders: Partial<Order.Order>[] | null;
    // default 0
    points: number | null;

    reports?: Partial<Report.Report>[] | null;

    reviews?: Partial<Review.Review>[] | null;
    messages?: Partial<Message.Message>[] | null;

    blockedUsers: number[] | null;
    registerAt: Date | string | null;
  }

  export type UserState = {
    isLogin: boolean;
    accessToken: string | null;
    refreshToken: string | null;
  } & Partial<User> &
    Omit<pass.PassAuthDataResponse, 'success' | 'message'>;

  export type PassVerifiedData = {
    username: string;
    mobile: string;
    birthday: string;
    gender: User.Gender;
  };

  export type UpdatePassVerifiedData = {
    uuid: string;
    loginVia: LoginVia;

    username: string;
    mobile: string;
    gender: Gender;
    birthday: string;
  };

  export type Role = 'USER' | 'ADMIN';
  export type LoginVia = 'EMAIL' | 'KAKAO' | 'GOOGLE' | 'APPLE';
  export type Property =
    | 'HEIGHT'
    | 'FACE'
    | 'BODY'
    | 'PROPERTY'
    | 'FAMILY'
    | 'GRADUATION'
    | 'JOB'
    | 'INCOME';
  export type Gender = 'MAN' | 'WOMAN';
  export type Grade = 'NORMAL' | 'VIP' | 'SPECIAL';
  export type ReviewStatus = 'CREATED' | 'PENDING' | 'APPROVED' | 'REJECTED';

  export type ListReq = api.BasicListReq<Partial<User>>;
  export type ListRes = Promise<api.BasicListRes<User>>;

  export type FindOneReq = api.BasicReq<Partial<User>>;
  export type FindOneRes = api.BasicRes<User>;

  export type Res = Promise<api.BasicRes<User>>;
  export type ResWithJwt = api.BasicRes<User & auth.JwtTypes>;

  export type UserOrNull = User | null;

  export type GetNicknames = api.BasicRes<{ nicknames: (string | null)[] }>;

  export type RegisterWithEmail = {
    email: string;
    password: string;
    loginVia: LoginVia | null;
  };

  export type RegisterWithSocial = {
    uuid: string;
    loginVia: LoginVia;
    email: string | null;
  };
  export type CreateRes = api.BasicRes<User>;
  export type LoginResponse = CreateRes & {
    accessToken: string;
    refreshToken: string | null;
  };
}
