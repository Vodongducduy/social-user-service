import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigsModule } from "src/config/configs.module";
import { UserEntity } from "src/user/entities/user.entity";

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports:[ConfigsModule],
        useFactory: async (configService: ConfigService) => ({
          type: "postgres",
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [UserEntity],
          synchronize: true,
          // logging: true,
        }),
        inject: [ConfigService]
      })
    ],
  })
export class DatabaseModule {}