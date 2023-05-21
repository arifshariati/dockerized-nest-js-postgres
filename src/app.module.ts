import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromptModule } from './prompt/prompt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDBConnectionconfig } from './utils';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(getDBConnectionconfig()),
    PromptModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
