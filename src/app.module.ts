import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigsModule } from './config/configs.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigsModule 
    , DatabaseModule
    , UserModule
    , AuthModule
  ]
})
export class AppModule {}
