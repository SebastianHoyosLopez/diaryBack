import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerenatasModule } from './serenatas/serenatas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Mariachibd',
      password: 'Mariachibd2023',
      database: 'diarybdMariachi',
      entities: [__dirname + `src/**/*.entity.ts`],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SerenatasModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
