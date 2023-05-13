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
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: 'Mariachibd',
      password: 'Mariachibd2023',
      database: 'diarybdMariachi',
      entities: [__dirname + process.env.TYPEORM_ENTITIES],
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
