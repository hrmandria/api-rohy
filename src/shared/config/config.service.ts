import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getTypeORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('TYPEORM_HOST'),
      username: this.getValue('TYPEORM_USERNAME'),
      password: this.getValue('TYPEORM_PASSWORD'),
      database: this.getValue('TYPEORM_DATABASE'),
      port: +this.getValue('TYPEORM_PORT'),
      entities: [UserEntity],
      synchronize: true,
    };
  }

  private getValue(key: string): string {
    const value = this.env[key];
    if (!value) {
      throw new Error(`Missing env variable ${key}`);
    }

    return value;
  }
}

export const configService = new ConfigService(process.env);
