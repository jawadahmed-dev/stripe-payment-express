import { Model, FilterQuery} from 'mongoose';
import { IBaseRepository } from '../../../application/contracts/repositories/base.repository';

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
    const created = await this.model.create(this.toDocument(entity));
    console.log("Created doc:", created);
    return this.toEntity(created.toObject ? created.toObject() : created);
  }

  async createMany(entities: Partial<TEntity>[]): Promise<TEntity[]> {
    const docs = entities.map((e) => this.toDocument(e));
    const createdDocs = await this.model.insertMany(docs);
    return createdDocs.map((doc: any) =>
      this.toEntity(doc.toObject ? doc.toObject() : doc)
    );
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

  async findBy(filter: FilterQuery<TDocument>): Promise<TEntity[]> {
    const docs = await this.model.find(filter).lean<TDocument[]>().exec();
    return docs.map(this.toEntity.bind(this));
  }

  async findOne(filter: FilterQuery<TDocument>): Promise<TEntity | null> {
    const doc = await this.model.findOne(filter).lean<TDocument>().exec();
    return doc ? this.toEntity(doc) : null;
  }
}

