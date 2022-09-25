import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_DB_TYPE,
      host: process.env.TYPEORM_DB_HOST,
      port: process.env.TYPEORM_DB_PORT,
      username: process.env.TYPEORM_DB_USERNAME,
      password: process.env.TYPEORM_DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    FilmsModule,
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
