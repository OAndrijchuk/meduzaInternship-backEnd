import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import 'dotenv/config';

const { DB_PASSWORD } = process.env;

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      // host: 'localhost',
      host: 'internship-db-cont',
      port: 8080,
      username: 'admin',
      password: 'jktue2040s',
      database: 'nest-app-db',
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
