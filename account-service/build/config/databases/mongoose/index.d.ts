export declare class Mongoose {
    private static instance;
    private mongoURI;
    private isConnected;
    private constructor();
    static getInstance(): Mongoose;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map