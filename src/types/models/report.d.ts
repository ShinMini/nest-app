declare namespace Report {
  export type Report = {
    id?: number;
    type?: string | null;
    status?: ReportStatus | null;

    // 신고한 유저의 id
    reporterId?: number;
    reporter?: Partial<User.User> | null;
    // 신고당한 유저의 id
    reportedUserId?: number;

    reason?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  };

  export type ReportStatus = 'PENDING' | 'RESOLVED' | 'REJECTED';
}

/*
  id               Int          @id @default(autoincrement())
  type             String       @default("ETC")
  status           ReportStatus @default(PENDING)
  // 신고한 유저의 ID
  reportUserUUID   String       @unique
  reportUser       User         @relation(fields: [reportUserUUID], references: [uuid], onUpdate: Cascade, onDelete: Cascade)
  // 신고 당한 유저의 ID
  reportedUserUUID String       @unique
  // 신고사유
  reason           String       @db.VarChar(500)
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
  */
