import { Db, ObjectId, Collection, Document } from 'mongodb';
declare class Mongo {
    private static instance;
    private client;
    private db;
    private constructor();
    static getInstance(): Mongo;
    connect(): Promise<void>;
    getDb(): Db;
    close(): Promise<void>;
}
export { Mongo, ObjectId, Db, Collection, Document };
export * from './validator';
//# sourceMappingURL=index.d.ts.map