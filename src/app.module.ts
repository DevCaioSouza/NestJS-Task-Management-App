import { Module } from '@nestjs/common'
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { DataSource } from 'typeorm';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'taskmanagement',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    TasksModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
