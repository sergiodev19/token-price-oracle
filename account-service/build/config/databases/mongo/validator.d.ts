export declare const userSchemaValidator: {
    $jsonSchema: {
        bsonType: string;
        title: string;
        required: string[];
        properties: {
            name: {
                minLength: number;
                maxLength: number;
                bsonType: string;
                description: string;
            };
            email: {
                bsonType: string;
                pattern: string;
                description: string;
            };
            password: {
                bsonType: string;
                pattern: string;
                description: string;
            };
            created_at: {
                bsonType: string;
                description: string;
            };
            updated_at: {
                bsonType: string;
                description: string;
            };
        };
    };
};
//# sourceMappingURL=validator.d.ts.map