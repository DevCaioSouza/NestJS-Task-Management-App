import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  // Open-Closed principle: Open for extension, closed for modification 
  // tasks não pode ser alterado por componentes externos
  private tasks = []

  getAllTasks(){
    return this.tasks
  }

}
