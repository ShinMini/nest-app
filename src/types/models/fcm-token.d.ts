declare namespace FcmToken {
  interface FcmToken {
    id: number;

    type: string;
    deviceToken: string;

    userUUID: string;
    user?: Partial<User.User>;
  }
}
