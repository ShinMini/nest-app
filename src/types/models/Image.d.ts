declare namespace Image {
  export type Image = {
    id: number;
    type?: ImageType;

    key: string;
    url?: string | null;

    caption: string;

    totalLike?: number;
    views?: number;

    ownerUUID: string;
    owner?: Partial<Profile.Profile>;
    likeUsers?: Partial<User.User>[];

    mimeType?: string | null;

    createdAt: Date;
    updatedAt: Date;
    expiresAt?: Date | null;

    profileUpdateRequestId?: number | null;
    ProfileUpdateRequest?: Partial<ProfileUpdateRequest.ProfileUpdateRequest>;
  };

  export type CreateParam = {
    key: string;
    type?: ImageType;

    ownerUUID: string;

    caption: string;
    mimeType?: string | null;
    expiresAt?: Date | null;
  };

  export type CreatedParam = {
    key: string;
    type?: ImageType;

    ownerUUID: string;
    url: string;

    caption: string;
    mimeType?: string | null;
    expiresAt?: Date | null;
  };

  export type ImageType =
    | 'PROFILE_IMAGE'
    | 'PROFILE_CERTIFICATION'
    | 'PROFILE_REQUESTED_IMAGE'
    | 'PROFILE_REQUESTED_CERTIFICATION'
    | 'MESSAGE_IMAGE'
    | 'INSTANT_MESSAGE_IMAGE'
    | 'ETC';
}
