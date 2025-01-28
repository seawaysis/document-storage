import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalModule } from './api/personal/personal.module';
// import { MinioModule } from './utilities/minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        // Runs a query before the connection is made to set the timezone
        //statement: 'SET TIMEZONE = "+07:00";',
      },
    }),
    PersonalModule,
    // MinioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
