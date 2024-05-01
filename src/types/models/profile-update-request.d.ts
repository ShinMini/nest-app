declare namespace ProfileUpdateRequest {
  export type ProfileUpdateRequest = {
    id: number;
    status?: RequestStatus;

    profileImages?: Array<Partial<Image.Image>> | null;
    requestedChanges?: api.JsonValue;
    adminResponse?: string | null;

    userUUID: string;
    user?: Partial<User.User> | null;

    createdAt?: Date;
    updatedAt?: Date;
  };

  export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ON_HOLD';

  export type ApproveParam = {
    status: RequestStatus;
    profileImages?: Array<Partial<Image.Image>>;
    requestedChanges: api.JsonValue;
    adminResponse?: string | null;

    userUUID: string;
  };
}
