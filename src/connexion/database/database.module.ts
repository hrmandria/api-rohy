import { Module } from "@nestjs/common";
import { databaseProvider } from "src/connexion/providers/database.providers";

@Module({
    providers: [...databaseProvider],
    exports: [...databaseProvider],
})
export class DatabaseModule{}