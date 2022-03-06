import { rohydb } from "src/connexion/entities/rohy.entity"
import { createConnection } from "typeorm"

export const databaseProvider = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            await createConnection({
                type: 'postgres',
                host:'abul.db.elephantsql.com',
                port: 5432,
                username: "lkjfnlei",
                password: "ojBCJJWVI2G9FEHTrlYaBEDhAc5eEmgV",
                database: "lkjfnlei",
                entities: [
                    rohydb
                ],
                synchronize: true
            })
        }
    }
]