declare namespace Product {
  export type Product = {
    id?: number;
    name?: string;
    price?: number;
    description?: string;

    // order info
    order?: Partial<Order.Order> | null;

    createdAt?: Date | null;
    updatedAt?: Date | null;
  };
}
