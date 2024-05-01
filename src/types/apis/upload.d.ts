declare namespace Upload {
  export type File<T extends string> = {
    fieldname: T;
  } & Express.Multer.File;

  export type Files<T extends string> = {
    [key in T]: File<T>[];
  };

  export type S3Params<T extends string = never> = {
    req: Express.Request;
    imageType: Image.ImageType;
    files:
      | Upload.Files<'profileImage'>
      | Upload.Files<'certFile'>
      | Upload.Files<T>;
    expiresIn?: number;
  };
}
