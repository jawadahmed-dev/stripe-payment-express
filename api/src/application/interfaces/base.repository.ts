// src/core/interfaces/IBaseRepository.ts

import { FilterQuery } from 'mongoose';

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findBy(filter: FilterQuery<T>): Promise<T[]>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  update(id: string, update: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}
