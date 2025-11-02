import { Model, FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, update: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}

export abstract class BaseRepository<TEntity, TDocument>
  implements IBaseRepository<TEntity> {

  constructor(protected readonly model: Model<TDocument>) {}

  protected abstract toEntity(doc: TDocument): TEntity;
  protected abstract toDocument(entity: Partial<TEntity>): Partial<TDocument>;

  async findById(id: string): Promise<TEntity | null> {
    const doc = await this.model.findById(id).lean<TDocument>().exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findAll(): Promise<TEntity[]> {
    const docs = await this.model.find().lean<TDocument[]>().exec();
    return docs.map(this.toEntity.bind(this));
  }

  async create(entity: Partial<TEntity>): Promise<TEntity> {
    const document = this.toDocument(entity);
    const created = await this.model.create(document);
    return this.toEntity(created.toObject ? created.toObject() : created);
  }

  async update(id: string, update: Partial<TEntity>): Promise<TEntity | null> {
    const updateDoc = this.toDocument(update);
    const doc = await this.model
      .findByIdAndUpdate(id, updateDoc, { new: true })
      .lean<TDocument>()
      .exec();
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  // Infra-specific (not part of IBaseRepository)
  async findBy(filter: FilterQuery<TDocument>): Promise<TEntity[]> {
    const docs = await this.model.find(filter).lean<TDocument[]>().exec();
    return docs.map(this.toEntity.bind(this));
  }

  async findOne(filter: FilterQuery<TDocument>): Promise<TEntity | null> {
    const doc = await this.model.findOne(filter).lean<TDocument>().exec();
    return doc ? this.toEntity(doc) : null;
  }
}