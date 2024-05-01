declare namespace api {
  export type SuccessResWithoutData = {
    success: true;
    message?: string;
  };
  export type SuccessResSpreadData<Model> = {
    success: true;
    message?: string;
  } & Model;

  export type SuccessRes<Model = never> = {
    success: true;
    message?: string;
    data: Model & { _count?: boolean | Count<Model> | unknown };
  };

  export type SuccessListRes<Model = never> = {
    success: true;
    message?: string;

    take: number;
    total: number;
    currentPage: number;
    totalPage: number;

    data: Model[];
    // optional
  };
  export interface FailRes {
    success: false;
    message: string;
    detail?: string;
    hint?: string;
  }

  // REQUEST
  export type BasicListReq<Model = never> = {
    page: number;
    take: number;

    //optional
    select?: BasicSelect<Model>;
    orderedBy?: BasicOrderBy<Model>;
    where?: BasicWhere<Model>;
  };
  export type BasicReq<Model = never> = {
    //optional
    select?: BasicSelect<Model>;
    include?: BasicInclude<Model>;
    data?: Partial<Model>;
  };

  // RESPONSE
  export type BasicListRes<Model = never> =
    | FailRes
    | SuccessListRes<Partial<Model>>;

  export type BasicRes<Model = never> = SuccessRes<Partial<Model>> | FailRes;

  export type BasicResSpreadData<Model extends object> =
    | FailRes
    | SuccessResSpreadData<Partial<Model>>;
  export type BasicResWithoutData = FailRes | SuccessResWithoutData;

  // BASIC query params
  export type BasicSelect<Model = never> = Partial<
    Record<keyof Model, boolean>
  >;
  export type BasicInclude<Model = never> = (
    | Partial<Record<keyof Model, boolean>>
    | {
        [key in keyof Model]?: BasicInclude<Model[key]>;
      }
  ) & {
    _count?: boolean | Count<Model>;
  };
  export type BasicWhere<Model = never> = {
    [key in keyof Model]?:
      | Model[key]
      | {
          contains?: string | Model[key];
          startsWith?: string | Model[key];
          endsWith?: string | Model[key];
          equals?: string | Model[key];
          lt?: string | Model[key];
          lte?: string | Model[key];
          gt?: string | Model[key];
          gte?: string | Model[key];
          in?: string | Model[key][];
          notIn?: string | Model[key][];
        };
  };
  export type SortOrder = 'asc' | 'desc';
  export type BasicOrderBy<Model = never> = Partial<
    Record<keyof Model, SortOrder>
  >;

  // BASIC response data
  class DbNull {
    private DbNull: never;
    private constructor();
  }
  class JsonNull {
    private JsonNull: never;
    private constructor();
  }
  class AnyNull {
    private AnyNull: never;
    private constructor();
  }
  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export type JsonValue =
    | string
    | number
    | boolean
    | JsonObject
    | JsonArray
    | null;
  export type JsonObject = { [Key in string]?: JsonValue };
  export interface JsonArray extends Array<JsonValue> {}

  export type InputJsonObject = {
    readonly [Key in string]?: InputJsonValue | null;
  };
  export interface InputJsonArray
    extends ReadonlyArray<InputJsonValue | null> {}
  export type InputJsonValue =
    | string
    | number
    | boolean
    | InputJsonObject
    | InputJsonArray
    | { toJSON(): unknown };

  export type Count<O> = {
    [K in keyof O]: Count<number>;
  } & object;
  export type GetCountResult<A> = A extends {
    select: infer S;
  }
    ? S extends true
      ? number
      : Count<S>
    : number;

  export type BasicFindFirstArgs<Model = never> = {
    select?: BasicSelect<Model>;
    where?: BasicWhere<Model>;
    include?: BasicInclude<Model>;
    orderBy?: BasicOrderBy<Model>;
  };

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  export type Boolean = True | False;
  export type True = 1;
  export type False = 0;

  /**
   * Is T a Record?
   */
  type IsObject<T = never> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends bigint
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T = never> = T extends Array<infer U> ? U : T;

  export type GetListParam = {
    page: number;
    take: number;
    skip?: number;
  };
}
