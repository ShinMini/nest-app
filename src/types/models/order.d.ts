declare namespace Order {
  export type Order = {
    id?: number;
    total?: number;
    status?: OrderStatus;

    customerId?: number;
    customer?: Partial<User.User> | null;

    productName?: string;
    product?: Partial<Product.Product> | null;

    createdAt?: Date | null;
    updatedAt?: Date | null;
  };

  export type OrderStatus =
    | 'CREATED'
    | 'REQUESTED'
    | 'CANCELED'
    | 'APPROVED'
    | 'REJECTED'
    | 'PENDING'
    | 'SUCCESS'
    | 'FAILED'
    | 'TIMEOUT';
}
