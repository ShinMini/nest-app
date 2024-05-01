declare namespace Review {
  export interface Review {
    id?: number;
    status?: ReviewStatus;
    rating?: number;

    reviewerId?: number;
    reviewer?: Partial<User.User> | null;

    cardId?: number;
    card?: Partial<MatchingCard.MatchingCard> | null;

    content?: string | null;

    createdAt?: Date | null;
    updatedAt?: Date | null;
  }

  export type ReviewStatus = 'CREATED' | 'PENDING' | 'APPROVED' | 'REJECTED';
}
