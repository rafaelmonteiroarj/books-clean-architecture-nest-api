import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/';
import { HttpModule } from './infra/http';

@Module({
  imports: [DatabaseModule, HttpModule, ConfigModule.forRoot()],
})
export class AppModule {}
