import { Model, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<Entity, Document> {
  constructor(protected readonly model: Model<Document>) {}

  // Abstract methods to map Document <-> Entity
  protected abstract toEntity(doc: Document): Entity;
  protected abstract toDocument(entity: Entity): Partial<Document>;

  async findById(id: string): Promise<Entity | null> {
    const doc = await this.model.findById(id).lean<Document>().exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findOne(conditions: FilterQuery<Document>): Promise<Entity | null> {
    const doc = await this.model.findOne(conditions).lean<Document>().exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findBy(conditions: FilterQuery<Document>): Promise<Entity[]> {
    const docs = await this.model.find(conditions).lean<Document[]>().exec();
    return docs.map(this.toEntity);
  }

  async findAll(): Promise<Entity[]> {
    const docs = await this.model.find().lean<Document[]>().exec();
    return docs.map(this.toEntity);
  }

  async create(entity: Entity): Promise<Entity> {
    const docToCreate = this.toDocument(entity);
    const createdDoc = await this.model.create(docToCreate);
    // createdDoc may not be lean, so convert after creation
    return this.toEntity(createdDoc.toObject ? createdDoc.toObject() : createdDoc);
  }

  async update(id: string, data: UpdateQuery<Document>): Promise<Entity | null> {
    const updatedDoc = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .lean<Document>()
      .exec();
    return updatedDoc ? this.toEntity(updatedDoc) : null;
  }

  async updateMany(conditions: FilterQuery<Document>, data: UpdateQuery<Document>): Promise<void> {
    await this.model.updateMany(conditions, data).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async deleteMany(conditions: FilterQuery<Document>): Promise<void> {
    await this.model.deleteMany(conditions).exec();
  }

  async count(conditions: FilterQuery<Document>): Promise<number> {
    return this.model.countDocuments(conditions).exec();
  }
}
