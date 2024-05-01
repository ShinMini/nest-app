declare namespace Profile {
  export type Profile = {
    complete: boolean;
    // 프로필 이미지
    images?: Array<Partial<Image.Image>> | null;
    // 자기소개
    oneLineIntroduction: string | null;
    selfIntroduction: string | null;

    mobile?: string | null;
    age?: number | null;
    height?: number | null;
    birthday?: Date | null;
    address?: string | null;
    company?: string | null;
    jobTitle?: string | null;
    

    bodyShape?: string | null;

    education?: string | null;
    exercise?: string | null;

    charmingPoint?: string[];
    MBTI?: string | null;
    interests?: string[];
    AIQuestion?: api.JsonValue | null;
    personality?: string[];

    smoking?: string | null;
    drinking?: string | null;
    religion?: string | null;

    location?: string[];
    latitude?: number | null;
    longitude?: number | null;
    locationLastUpdated?: Date | null;

    userUUID: string;
    user?: Partial<User.User> | null;

    createdAt?: Date | null;
    updatedAt?: Date | null;
  };
  // PROFILE SET UP PAGE: STEP 2
  type QuestionType = 'religion' | 'education' | 'drinking' | 'smoking' | 'exercise';
  type QuestionList = Record<QuestionType, string>;
  type Pagination = {
    isCompleted: boolean;
    currentQuestion: QuestionType;
    currentIndex: number;
};
  type RegisterStep2State = Pagination & QuestionList;

  type RequireProfileCompletionElement =
  | 'username'
  | 'gender'
  | 'mobile'
  | 'nickname'
  | 'religion'
  | 'education'
  | 'drinking'
  | 'isSmoking'
  | 'exercise'
  | 'height'
  | 'location'
  | 'area'
  | 'MBTI'
  | 'personality'
  | 'AIQuestion'
  | 'interests'
  | 'charmingPoint';
  // API TYPES
  // REQUEST PARAMS
  export type GetProfileParams = {
    userUUID: string;
  };

  // RESPONSE
  export type GetProfileResponse = api.BasicReq<Partial<Profile>>;
  type CheckDuplicateNickname =
    | Prettify<
        api.SuccessResWithoutData & {
          nickname: string;
          isDuplicate: boolean;
        }
      >
    | api.FailRes;
  type UpdateNicknames = api.BasicRes<{ nickname: string }>;
}
