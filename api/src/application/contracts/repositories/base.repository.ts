
// Application layer (pure contracts, no Mongoose imports)
export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  createMany(entities: Partial<T>[]): Promise<T[]>
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, update: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}

